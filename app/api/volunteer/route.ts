import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { connectDB } from "@/lib/mongodb"
import { volunteerSchema } from "@/app/superadmin/volunteer/addNew/volunteer-schema"
import User from "@/models/User"

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")

    const filter: any = { userType: "volunteer" }
    if (status) filter.status = status

    const volunteers = await User.find(filter)
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json(
      {
        success: true,
        count: volunteers.length,
        data: volunteers,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error fetching volunteers:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch volunteers",
        details: error.message,
      },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized - Please login" },
        { status: 401 }
      )
    }

    const body = await req.json()

    // Validate with Zod schema
    const validationResult = volunteerSchema.safeParse(body)

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }))

      return NextResponse.json(
        {
          error: "Validation failed",
          details: errors,
        },
        { status: 400 }
      )
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
      profilePhoto,
      skills,
      availability,
      status,
      emergencyContactName,
      emergencyContactPhone,
      notes,
    } = body

    await connectDB()

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 400 }
      )
    }

    // Helper function to convert comma-separated strings to arrays
    const toArray = (value: string | string[] | undefined): string[] => {
      if (!value) return []
      if (Array.isArray(value)) return value
      return value.split(",").map((item) => item.trim()).filter(Boolean)
    }

    // Create new volunteer user
    const volunteer = await User.create({
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email,
      phone,
      mobileNumber: phone,
      userType: "volunteer",
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      gender,
      address,
      profilePhoto,
      profilePicture: profilePhoto,
      skills: toArray(skills),
      availability: availability || [],
      status: status || "pending",
      emergencyContact: emergencyContactName
        ? {
            name: emergencyContactName,
            phone: emergencyContactPhone,
          }
        : undefined,
      notes,
      hoursContributed: 0,
      createdBy: session.user.id || session.user.email,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Volunteer created successfully",
        data: volunteer,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Error creating volunteer:", error)
    return NextResponse.json(
      {
        error: "Failed to create volunteer",
        details: error.message,
      },
      { status: 500 }
    )
  }
}
