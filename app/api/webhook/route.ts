import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import Donor from "@/models/Donor";

export async function POST(req: Request) {
  try {
    
    const body = await req.text();

    const razorpaySignature =
      req.headers.get("x-razorpay-signature");

    if (!razorpaySignature) {
      return NextResponse.json(
        { error: "Signature missing" },
        { status: 400 }
      );
    }

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_WEBHOOK_SECRET!
      )
      .update(body)
      .digest("hex");

    if (razorpaySignature !== expectedSignature) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
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
