import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import Donor from "@/models/Donor";
import DonationInvoice from "@/models/DonationInvoice";
import { generateInvoicePDF, numberToWords } from "@/lib/pdf/generateInvoicePDF";
import { sendInvoiceEmail } from "@/lib/email/sendInvoiceEmail";

// Disable body parsing for webhook to access raw body
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // Log all headers for debugging
    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key] = value;
    });
    console.log("Webhook headers received:", JSON.stringify(headers, null, 2));
    
    const body = await req.text();
    console.log("Webhook body received:", body);

    const razorpaySignature =
      req.headers.get("x-razorpay-signature") || req.headers.get("X-Razorpay-Signature");

    // Verify signature if webhook secret is configured
    if (process.env.RAZORPAY_WEBHOOK_SECRET && razorpaySignature) {
      const expectedSignature = crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_WEBHOOK_SECRET
        )
        .update(body)
        .digest("hex");

      if (razorpaySignature !== expectedSignature) {
        console.error("Signature mismatch - Invalid webhook signature");
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 400 }
        );
      }
      console.log("Signature verified successfully");
    } else if (process.env.RAZORPAY_WEBHOOK_SECRET && !razorpaySignature) {
      console.warn("WARNING: Webhook secret is configured but signature header is missing!");
      console.warn("Please configure webhook secret in Razorpay Dashboard");
      return NextResponse.json(
        { error: "Signature missing - Configure webhook secret in Razorpay Dashboard" },
        { status: 400 }
      );
    } else {
      console.warn("WARNING: Webhook secret not configured - Running without signature verification (NOT RECOMMENDED FOR PRODUCTION)");
    }

    const event = JSON.parse(body);

    await connectDB();

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      const razorpayOrderId = payment.order_id;
      const razorpayPaymentId = payment.id;

      const donation = await Donation.findOne({
        razorpayOrderId,
      });

      if (!donation) {
        return NextResponse.json(
          { error: "Donation not found" },
          { status: 404 }
        );
      }

      if (donation.status === "paid") {
        return NextResponse.json({ success: true });
      }

      donation.status = "paid";
      donation.razorpayPaymentId = razorpayPaymentId;
      donation.paymentMethod = payment.method;
      await donation.save();

      await Donor.findByIdAndUpdate(donation.donorId, {
        isDonor: true,
      });

      // Generate invoice and send email
      try {
        // Populate donor details
        await donation.populate("donorId");
        const donor = donation.donorId as any;

        // Create invoice record
        const invoice = await DonationInvoice.create({
          donationId: donation._id,
          donorId: donor._id,
          donor: {
            name: donor.name,
            mobile: donor.mobile,
            email: donor.email,
            donorType: donor.donorType,
          },
          amount: donation.amount,
          amountInWords: numberToWords(donation.amount),
          currency: donation.currency,
          payment: {
            razorpayOrderId: donation.razorpayOrderId,
            razorpayPaymentId: razorpayPaymentId,
            paymentMethod: payment.method,
            transactionId: payment.acquirer_data?.bank_transaction_id || razorpayPaymentId,
            paymentDate: new Date(),
          },
          is80GEligible: true,
          taxExemptionPercentage: 50,
          status: "generated",
        });

        // Generate PDF
        const pdfUrl = await generateInvoicePDF({
          invoiceNumber: invoice.invoiceNumber,
          invoiceDate: invoice.invoiceDate,
          donorName: donor.name,
          donorMobile: donor.mobile,
          donorEmail: donor.email,
          amount: donation.amount,
          amountInWords: invoice.amountInWords,
          paymentMethod: payment.method,
          transactionId: payment.acquirer_data?.bank_transaction_id || razorpayPaymentId,
          paymentDate: new Date(),
          receiptNumber: invoice.invoiceNumber,
          is80GEligible: true,
          foundationName: "Sirsa Foundation",
          foundationAddress: "Old Age Home, Sirsa, Haryana, India",
          foundationPAN: "AAATS1234F",
        });

        // Update invoice with PDF URL
        invoice.pdfUrl = pdfUrl;
        invoice.pdfGeneratedAt = new Date();
        await invoice.save();

        // Send email if donor has email
        if (donor.email) {
          const emailSent = await sendInvoiceEmail({
            to: donor.email,
            donorName: donor.name,
            amount: donation.amount,
            invoiceNumber: invoice.invoiceNumber,
            pdfPath: pdfUrl,
            transactionId: payment.acquirer_data?.bank_transaction_id || razorpayPaymentId,
          });

          if (emailSent) {
            invoice.sentTo = [donor.email];
            invoice.sentAt = new Date();
            invoice.status = "sent";
            await invoice.save();
          }
        }

        console.log("Invoice generated successfully:", invoice.invoiceNumber);
      } catch (invoiceError) {
        console.error("Error generating invoice:", invoiceError);
        // Don't fail the webhook if invoice generation fails
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
