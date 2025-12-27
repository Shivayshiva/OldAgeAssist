import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { connectDB } from "@/lib/mongodb"
import Member from "@/models/Member"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized - Please login" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const {
      age,
      gender,
      phone,
      addressLine,
      townOrVillage,
      district,
      state,
      pincode,
      skills,
      availabilityDays,
      availabilityTimeSlots,
    } = body

    await connectDB()

    // Find member by email
    const member = await Member.findOne({ "auth.email": session.user.email })

    if (!member) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 404 }
      )
    }

    // Update member with onboarding data
    member.profile.age = parseInt(age)
    member.profile.gender = gender
    
    member.address.addressLine = addressLine
    member.address.townOrVillage = townOrVillage
    member.address.district = district
    member.address.state = state
    member.address.pincode = pincode

    member.volunteer.skills = skills
    member.volunteer.availability.days = availabilityDays
    member.volunteer.availability.timeSlots = availabilityTimeSlots
    member.volunteer.onboardingCompleted = true
    member.volunteer.volunteerStatus = "pending_verification"

    member.meta.onboardingCompletedAt = new Date()

    await member.save()

    return NextResponse.json(
      {
        success: true,
        message: "Onboarding completed successfully",
        data: {
          id: member._id,
          name: member.profile.fullName,
          status: member.volunteer.volunteerStatus,
        },
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Onboarding error:", error)
    return NextResponse.json(
      {
        error: "Failed to complete onboarding",
        details: error.message,
      },
      { status: 500 }
    )
  }
}
