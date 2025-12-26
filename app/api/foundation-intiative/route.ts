import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import FoundationWork from "@/models/FoundationWork"
import { authOptions } from "@/lib/authOptions"
import { connectDB } from "@/lib/mongodb"

export async function GET(req: NextRequest) {
  try {
    // Connect to database
    await connectDB()

    // Get query parameters for filtering
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const category = searchParams.get("category")
    const impact = searchParams.get("impact")

    // Build filter object
    const filter: any = {}
    if (status) filter.status = status
    if (category) filter.category = category
    if (impact) filter.impact = impact

    // Fetch foundation works with optional filters
    const foundationWorks = await FoundationWork.find(filter)
      .populate("organizedBy", "name email")
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json(
      {
        success: true,
        count: foundationWorks.length,
        data: foundationWorks,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error fetching foundation works:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch foundation works",
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

    // Parse the request body
    const body = await req.json()

    const {
      title,
      description,
      category,
      status,
      startDate,
      endDate,
      startTime,
      endTime,
      budget,
      beneficiaries,
      impact,
      location,
      googleMapLocation,
      requirement,
      imageUrl,
      volunteerRequirement,
      rewards,
      facilities,
    } = body

    // Validate required fields
    if (!title || !description || !category || !startDate || !startTime || !endTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Connect to database
    await connectDB()

    // Create new foundation work
    const foundationWork = await FoundationWork.create({
      title,
      description,
      category,
      status: status || "Planning",
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : undefined,
      startTime,
      endTime,
      budget: Number(budget) || 0,
      beneficiaries: Number(beneficiaries) || 0,
      impact: impact || "Medium",
      location,
      googleMapLocation,
      requirement,
      imageUrl,
      volunteerRequirement: volunteerRequirement?.map((vr: any) => ({
        type: vr.type,
        requiredCount: Number(vr.requiredCount) || 1,
      })) || [],
      rewards: Array.isArray(rewards) ? rewards : [],
      facilities: Array.isArray(facilities) ? facilities : [],
      organizedBy: session.user.id as string,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Foundation work created successfully",
        data: foundationWork,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Error creating foundation work:", error)
    return NextResponse.json(
      {
        error: "Failed to create foundation work",
        details: error.message,
      },
      { status: 500 }
    )
  }
}

