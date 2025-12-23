import FeedPost from "../feed/feed-post"
import { connectDB } from "@/lib/mongodb"
import Feed from "@/models/Feed"
import dynamic from "next/dynamic"
const LoadMoreUsers = dynamic(() => import("../loadMoreFeed"))

function formatTimeAgo(date: Date) {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000)

  if (diffInSeconds < 60) return "just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  return new Date(date).toLocaleDateString()
}

export default async function FeedPosts() {
  await connectDB()

  const feeds = await Feed.find({})
    .populate("author")
    .sort({ createdAt: -1 })
    .lean()
    .skip(0)
    .limit(5);

  const formattedFeeds = feeds?.map((feed: any) => ({
    id: feed._id.toString(),
    author: {
      name: feed.author?.profile?.fullName || "Unknown Volunteer",
      avatar: feed.author?.profile?.profilePhoto || null,
    },
    images: feed.images || [],
    title: feed.title,
    description: feed.description,
    category: feed.category,
    likes: feed.likes?.length || 0,
    comments: feed.comments?.length || 0,
    timestamp: formatTimeAgo(feed.createdAt),
    viewMode: feed.viewMode || "grid",
  }))

  return (
    <div>
      <div className="space-y-1">
        {formattedFeeds.map((post) => (
          <FeedPost key={post.id} {...post} />
        ))}
      </div>
      
      <LoadMoreUsers initialPage={1}/>
    </div>
  )
}