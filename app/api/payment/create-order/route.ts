import razorpay from "@/lib/razorpay";
import Donor from "@/models/Donor";
import Donation from "@/models/Donation";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { emitNotification } from "@/lib/notifications/emit";

export async function POST(req: Request) {


  try{
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const mobile = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const aadhaarNumber = formData.get("aadhaar") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const state = formData.get("state") as string;
    const district = formData.get("district") as string;
    const townVillage = formData.get("townVillage") as string;
    const pincode = formData.get("pincode") as string;
    const photoUrl = ""; // Placeholder: Implement file upload logic to get URL
    await connectDB()

    let user = await Donor.findOne({ mobile });

  if (!user) {
    user = await Donor.create({
      name,
      mobile,
      email,
      aadhaarNumber,
      photoUrl,
      state,
      district,
      townVillage,
      pincode,
    });
  } else if (email && !user.email) {
    // Update email if user exists but doesn't have email
    user.email = email;
    await user.save();
  }

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: `donation_${Date.now()}`,
  });


  await Donation.create({
    donorId: user._id,
    razorpayOrderId: order.id,
    amount,
    status: "created",
  });

  //   await emitNotification("DONATION_SUCCESS", {
  //   userId: user._id,
  //   amount,
  // });
  return NextResponse.json({...order, amount:amount, name:name, mobile:mobile});

  }catch(error){
    console.log("ERRORERROR", error)
  }   
}
