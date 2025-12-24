"use client"
import { ImageCarousel } from "./image-carousel"
import GlobalImage from "../GlobalImage"
import { ActionButton } from "./actionButton"

interface FeedPostProps {
  id: string
  author: {
    name: string
    avatar: string
  }
  images?: string[]
  image?: string
  title: string
  description: string
  category: string
  likes: number
  comments: number
  timestamp: string
  viewMode?: "grid" | "slide"
}

export default function FeedPost({
  id,
  author,
  images,
  image,
  title,
  description,
  category,
  likes,
  comments,
  timestamp,
  viewMode = "grid",
}: FeedPostProps) {
  const imageList = images || (image ? [image] : [])

  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border shadow-sm mb-4">
      {/* Post Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary overflow-hidden">
            <GlobalImage  
             src={author?.avatar}
              alt={author?.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />

          </div>
          <div>
            <p className="font-semibold text-sm text-foreground">{author.name}</p>
            <p className="text-xs text-muted-foreground">{timestamp}</p>
          </div>
        </div>
        <div className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">{category}</div>
      </div>

      {viewMode === "grid" ? (
        imageList.length > 0 && (
          <div
            className={`grid gap-0.5 ${
              imageList.length === 1
                ? "grid-cols-1"
                : imageList.length === 2
                ? "grid-cols-2"
                : "grid-cols-2"
            }`}
          >
            {imageList.slice(0, 4).map((img, index) => (
              <div
                key={index}
                className={`relative ${
                  imageList.length === 3 && index === 0 ? "row-span-2 h-full" : "aspect-square"
                } ${imageList.length === 1 ? "aspect-video" : ""}`}
              >
                <GlobalImage
                  src={img}
                  alt={title}
                  fill
                  className="object-cover"
                />
                {index === 3 && imageList.length > 4 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-xl">
                    +{imageList.length - 4}
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      ) : (
        <ImageCarousel images={imageList} title={title} />
      )}

      {/* Post Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>

        {/* Action Buttons */}
       <ActionButton likes={likes} comments={comments} />
      </div>
    </div>
  )
}
