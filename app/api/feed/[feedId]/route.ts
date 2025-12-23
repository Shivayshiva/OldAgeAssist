import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { connectDB } from "@/lib/mongodb"
import Feed from "@/models/Feed"
import { z } from "zod"
import mongoose from "mongoose"

const updateSchema = z.object({
  action: z.enum(["like", "comment"]),
  text: z.string().optional(),
})

export async function PATCH(
  req: Request,
  { params }: { params: { feedId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as { id: string }).id
    const { feedId } = params

    if (!mongoose.Types.ObjectId.isValid(feedId)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 })
    }

    const body = await req.json()
    const validatedFields = updateSchema.safeParse(body)

    if (!validatedFields.success) {
        return NextResponse.json({ success: false, error: "Invalid fields", details: validatedFields.error }, { status: 400 })
    }

    const { action, text } = validatedFields.data

    await connectDB()

    const feed = await Feed.findById(feedId)

    if (!feed) {
        return NextResponse.json({ success: false, error: "Feed not found" }, { status: 404 })
    }

    if (action === "like") {
        const isLiked = feed.likes.some((id: any) => id.toString() === userId)
        
        if (isLiked) {
            feed.likes = feed.likes.filter((id: any) => id.toString() !== userId)
        } else {
            feed.likes.push(userId)
        }
    } else if (action === "comment") {
        if (!text) {
            return NextResponse.json({ success: false, error: "Comment text required" }, { status: 400 })
        }
        
        feed.comments.push({
            user: userId,
            text,
            createdAt: new Date()
        })
    }

    await feed.save()

    return NextResponse.json({ success: true, feed }, { status: 200 })
  } catch (error) {
    console.error("Error updating feed:", error)
    return NextResponse.json({ success: false, error: "Failed to update feed" }, { status: 500 })
  }
}