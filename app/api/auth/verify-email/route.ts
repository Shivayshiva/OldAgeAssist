import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Member from "@/models/Member"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get("token")

    console.log("token_token_token",token)

    if (!token) {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 }
      )
    }

    await connectDB()

    // Find member with matching verification token and check expiry
    const member = await Member.findOne({
      "auth.emailVerificationToken": token,
      "auth.emailVerificationExpires": { $gt: new Date() }
    })

    if (!member) {
      return NextResponse.json(
        { error: "Invalid or expired verification token" },
        { status: 400 }
      )
    }

    // Mark email as verified
    member.auth.isEmailVerified = true
    member.auth.emailVerificationToken = undefined
    member.auth.emailVerificationExpires = undefined
    member.volunteer.volunteerStatus = "onboarding_pending"
    await member.save()

    return NextResponse.json(
      { 
        success: true,
        message: "Email verified successfully! You can now complete your profile.",
        user: {
          id: member._id,
          email: member.auth.email,
          name: member.profile.fullName
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json(
      { error: "Failed to verify email. Please try again." },
      { status: 500 }
    )
  }
}
