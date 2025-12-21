import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import User from "@/models/User";

/**
 * Razorpay Webhook Handler
 * IMPORTANT:
 * - Must use req.text() (not req.json())
 * - Must verify signature before DB updates
 */
export async function POST(req: Request) {
  try {
    // 1️⃣ Get raw body (CRITICAL)
    const body = await req.text();

    // 2️⃣ Get Razorpay signature from headers
    const razorpaySignature =
      req.headers.get("x-razorpay-signature");

    if (!razorpaySignature) {
      return NextResponse.json(
        { error: "Signature missing" },
        { status: 400 }
      );
    }

    // 3️⃣ Generate expected signature
    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_WEBHOOK_SECRET!
      )
      .update(body)
      .digest("hex");

    // 4️⃣ Compare signatures
    if (razorpaySignature !== expectedSignature) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // 5️⃣ Parse event AFTER verification
    const event = JSON.parse(body);

    // 6️⃣ Connect DB
    await connectDB();

    /**
     * Handle payment success
     */
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      const razorpayOrderId = payment.order_id;
      const razorpayPaymentId = payment.id;

      // 7️⃣ Find donation by order ID
      const donation = await Donation.findOne({
        razorpayOrderId,
      });

      if (!donation) {
        return NextResponse.json(
          { error: "Donation not found" },
          { status: 404 }
        );
      }

      // 8️⃣ Prevent duplicate processing
      if (donation.status === "paid") {
        return NextResponse.json({ success: true });
      }

      // 9️⃣ Update donation
      donation.status = "paid";
      donation.razorpayPaymentId = razorpayPaymentId;
      donation.paymentMethod = payment.method;
      await donation.save();

      // 🔟 Update user as donor
      await User.findByIdAndUpdate(donation.userId, {
        isDonor: true,
      });
    }

    // 11️⃣ Acknowledge webhook
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
