import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Member from "@/models/Member"
import { sendVerificationEmail } from "@/lib/sendVerificationEmail"
import crypto from "crypto"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email } = body

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    await connectDB()

    // Check if user already exists
    const existingMember = await Member.findOne({ "auth.email": email.toLowerCase().trim() })
    if (existingMember) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 400 }
      )
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex")
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Create new volunteer member with verification fields directly
    const volunteer = new Member({
      auth: {
        provider: "credentials",
        email: email.toLowerCase().trim(),
        isEmailVerified: false,
        emailVerificationToken: verificationToken,
        emailVerificationExpires: verificationTokenExpiry,
      },
      profile: {
        fullName: name,
      },
      role: "volunteer",
      volunteer: {
        volunteerStatus: "new",
        onboardingCompleted: false,
      },
    })

    // Save using instance method to bypass select: false
    await volunteer.save()

    // Send verification email
    try {
      await sendVerificationEmail(email, name, verificationToken)
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError)
      // Don't fail the registration if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful. Please check your email to verify your account.",
        data: {
          id: volunteer._id,
          name: volunteer.profile.fullName,
          email: volunteer.auth.email,
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Error registering volunteer:", error)
    return NextResponse.json(
      {
        error: "Failed to register volunteer",
        details: error.message,
      },
      { status: 500 }
    )
  }
}
