
import { NextRequest, NextResponse } from "next/server";
import Staff from "@/models/Staff";
import { connectDB } from "@/lib/mongodb";
import { z } from "zod";

const staffSchema = z.object({
  fullName: z.string().min(2),
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string().min(1),
  aadhaarNumber: z.string().optional(),
  panNumber: z.string().optional(),
  mobileNumber: z.string().min(8),
  alternateMobileNumber: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  profilePhoto: z.string().optional(),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    pincode: z.string().min(4),
  }),
  emergencyContact: z.object({
    name: z.string().min(1),
    relation: z.string().min(1),
    phone: z.string().min(8),
  }),
  designation: z.string().min(1),
  department: z.string().min(1),
  employmentType: z.enum(["full-time", "part-time", "contract"]),
  joiningDate: z.string().min(1),
  shift: z.enum(["morning", "evening", "night", "rotational"]),
  workLocation: z.string().min(1),
  salary: z.string().min(1),
  salaryType: z.enum(["monthly", "daily", "hourly"]),
  paymentMode: z.enum(["cash", "bank", "upi"]),
  bankDetails: z.object({
    accountHolderName: z.string().optional(),
    accountNumber: z.string().optional(),
    ifscCode: z.string().optional(),
    bankName: z.string().optional(),
    upiId: z.string().optional(),
  }),
  attendanceType: z.enum(["manual", "biometric", "app"]),
  status: z.enum(["active", "inactive", "suspended", "resigned"]),
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const parseResult = staffSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ success: false, errors: parseResult.error.flatten() }, { status: 400 });
    }
    const staff = await Staff.create(parseResult.data);
    return NextResponse.json({ success: true, staff }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const staffList = await Staff.find({});
    return NextResponse.json({ success: true, staff: staffList }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


