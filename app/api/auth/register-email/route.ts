import { NextResponse } from "next/server"
import Member from "@/models/Member"
import { generateEmailVerificationToken } from "@/lib/emailVerification"
import { sendVerificationEmail } from "@/lib/sendVerificationEmail"
import { connectDB } from "@/lib/mongodb"

export async function POST(req: Request) {
  const { name, email } = await req.json()

  if (!email || !name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  await connectDB()

  const existing = await Member.findOne({ "auth.email": email })
  if (existing) {
    return NextResponse.json(
      { error: "Email already registered" },
      { status: 409 }
    )
  }

  const { token, expires } = generateEmailVerificationToken()

  const member = new Member({
    auth: {
      provider: "credentials",
      email,
      isEmailVerified: false,
      emailVerificationToken: token,
      emailVerificationExpires: expires
    },
    profile: {
      fullName: name
    },
    role: "volunteer",
    volunteer: {
      volunteerStatus: "new"
    }
  })

  // Save using instance method to bypass select: false
  await member.save()

  await sendVerificationEmail(email, name, token)

  return NextResponse.json({
    message: "Verification email sent"
  })
}
