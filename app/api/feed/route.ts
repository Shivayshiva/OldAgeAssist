import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { connectDB } from "@/lib/mongodb"
import Feed from "@/models/Feed"
import Member from "@/models/Member"
import { z } from "zod"

const feedSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  images: z.array(z.string()).optional(),
  category: z.string().min(1),
  viewMode: z.enum(["grid", "slide"]).optional(),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const validatedFields = feedSchema.safeParse(body)

    if (!validatedFields.success) {
        return NextResponse.json({ success: false, error: "Invalid fields", details: validatedFields.error }, { status: 400 })
    }

    await connectDB()

    const payload = {
      ...validatedFields.data,
      author: (session.user as { id: string }).id
    }

    const feed = await Feed.create(payload)
    return NextResponse.json({ success: true, feed: feed }, { status: 201 })
  } catch (error) {
    console.error("Error creating feed post:", error)
    return NextResponse.json({ success: false, error: "Failed to create post" }, { status: 500 })
  }
}

export async function GET(req: Request) {
     const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = 5;
  try {
    await connectDB()

    // Ensure Member model is registered
    const _ = Member

    const feeds = await Feed.find({})
    //   .populate("author", "profile.fullName profile.profilePhoto")
      .populate("author")
      .sort({ createdAt: -1 })
      .lean()
        .skip((page - 1) * limit)
    .limit(limit);

    return NextResponse.json({ success: true, feeds }, { status: 200 })
  } catch (error) {
    console.error("Error fetching feeds:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch feeds" }, { status: 500 })
  }
}
