import { NextResponse } from "next/server";
import Donation from "@/models/Donation";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  await connectDB();
  const donationsRaw = await Donation.find().populate("donorId").lean();
  const donations = donationsRaw.map((d) => ({
    ...d,
    _id: d._id?.toString?.() ?? "",
    donorId: d.donorId && typeof d.donorId === "object"
      ? { ...d.donorId, _id: d.donorId._id?.toString?.() ?? "" }
      : d.donorId?.toString?.() ?? "",
    createdAt: d.createdAt ? new Date(d.createdAt).toISOString() : "",
    updatedAt: d.updatedAt ? new Date(d.updatedAt).toISOString() : "",
  }));
  return NextResponse.json({ donations });
}
