import razorpay from "@/lib/razorpay";
import User from "@/models/User";
import Donation from "@/models/Donation";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {


  try{
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const mobile = formData.get("phone") as string;
    const aadhaarNumber = formData.get("aadhaar") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const photoUrl = ""; // Placeholder: Implement file upload logic to get URL
    await connectDB()

    let user = await User.findOne({ mobile });

  if (!user) {
    user = await User.create({
      name,
      mobile,
      aadhaarNumber,
      photoUrl,
    });
  }

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: `donation_${Date.now()}`,
  });


  await Donation.create({
    userId: user._id,
    razorpayOrderId: order.id,
    amount,
    status: "created",
  });
  console.log("RAZORPAY_RAZORPAY",{...order, amount:amount, name:name, mobile:mobile})
  return NextResponse.json({...order, amount:amount, name:name, mobile:mobile});

  }catch(error){
    console.log("ERRORERROR", error)
  }   
}
