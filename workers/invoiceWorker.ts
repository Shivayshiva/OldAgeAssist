import { Worker } from "bullmq";
import { redisConnection } from "@/lib/redis";
import { connectDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import DonationInvoice from "@/models/DonationInvoice";
import { generateInvoicePDF, numberToWords } from "@/lib/pdf/generateInvoicePDF";
import { sendInvoiceEmail } from "@/lib/email/sendInvoiceEmail";

new Worker(
  "invoice-queue",
  async (job) => {
    await connectDB();

    const { donationId, paymentId , payment} = job.data;

    const donation = await Donation.findById(donationId).populate("donorId");
    if (!donation) throw new Error("Donation not found");

    // 🛑 Prevent duplicate invoice
    const exists = await DonationInvoice.findOne({ donationId });
    if (exists) return;

    const donor: any = donation.donorId;

    const invoice = await DonationInvoice.create({
         donationId: donation._id,
          donorId: donor._id,
          donorName: donor.name,
          donorMobile: donor.mobile,
          donorEmail: donor.email,
          donorType: donor.donorType,
          amount: donation.amount,
          amountInWords: numberToWords(donation.amount),
          currency: donation.currency,
          paymentMethod: payment.method,
          razorpayOrderId: donation.razorpayOrderId,
          razorpayPaymentId: paymentId,
          transactionId: payment.acquirer_data?.bank_transaction_id || paymentId,
          paymentDate: new Date(),
          is80GEligible: true,
          taxExemptionPercentage: 50,
          status: "generated",
          financialYear:"2023-2024",
          invoiceNumber: `SF/${new Date().getFullYear()}/${String(
            Math.floor(1000 + Math.random() * 9000)
          )}`,
          invoiceDate: new Date(),
          donationPurpose: "general",
          donationCategory: "one-time",
          notes: "",
    });

    const pdfUrl = await generateInvoicePDF({
      invoiceNumber: invoice.invoiceNumber,
          invoiceDate: invoice.invoiceDate,
          donorName: donor.name,
          donorMobile: donor.mobile,
          donorEmail: donor.email,
          amount: donation.amount,
          amountInWords: invoice.amountInWords,
          paymentMethod: payment.method,
          transactionId: payment.acquirer_data?.bank_transaction_id || paymentId,
          paymentDate: new Date(),
          receiptNumber: invoice.invoiceNumber,
          is80GEligible: true,
          foundationName: "Sirsa Foundation",
          foundationAddress: "Sirsa Foundation, Gorakhpur, Uttar Pradesh, India",
          foundationPAN: "AAATS1234F",
    });

    invoice.pdfUrl = pdfUrl;
    invoice.pdfGeneratedAt = new Date();
    await invoice.save();

    if (donor.email) {
      const emailSent = await sendInvoiceEmail({
        to: donor.email,
        donorName: donor.name,
        amount: donation.amount,
        invoiceNumber: invoice.invoiceNumber,
        pdfPath: pdfUrl,
        transactionId: paymentId,
      });

      if(emailSent){
        invoice.status = "sent";
        invoice.sentAt = new Date();
        invoice.sentTo = [donor.email];
        await invoice.save();
      }
     
    }
  },
  {
    connection: redisConnection,
    concurrency: 3,
  }
);

console.log("Invoice Worker Started");
