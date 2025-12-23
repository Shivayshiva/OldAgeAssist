"use client";

import { useState } from "react";
import { GlobalButton } from "../ui/GlobalButton";
import { ArrowDown, Loader2 } from "lucide-react";
import FeedPost from "../feed/feed-post";

export default function LoadMoreUsers({ initialPage }: { initialPage: number }) {
  const [page, setPage] = useState(initialPage);
  const [feedList, setFeedList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  function formatTimeAgo(date: Date) {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000)

  if (diffInSeconds < 60) return "just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  return new Date(date).toLocaleDateString()
}

  async function loadMore() {
    setLoading(true);
    const res = await fetch(`/api/feed?page=${page + 1}`);
    const data = await res.json();
    console.log("data_data_DATA_DATA", data)

     const formattedFeeds = data?.feeds?.map((feed: any) => ({
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

  if(!formattedFeeds || formattedFeeds.length === 0){
    setLoading(false);
    return;
  }else{
    setFeedList(prev => [...prev, ...formattedFeeds]);
    setPage(page + 1);
    setLoading(false);
  }
    
  }

  return (
    <>
        <div className="space-y-1">
              {feedList?.map((post) => (
                <FeedPost key={post.id} {...post} />
              ))}
        </div>

         <div className="flex justify-center py-8">
        <GlobalButton onClick={loadMore} title={loading ? "Loading..." : "Load More"} icon={loading ? <Loader2/> : <ArrowDown/>} disabled={loading}/>
    </div>
    </>
  );
}
