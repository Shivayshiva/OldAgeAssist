import { Heart, MessageCircle, Share2 } from "lucide-react"

interface ActionButtonProps {
  likes: number
  comments: number
}

export function ActionButton({ likes, comments }: ActionButtonProps) {
  return (
    <div className="flex items-center justify-between gap-4 mb-4 pt-4 border-t border-border">
      <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors flex-1 justify-center py-2">
        <Heart className="w-5 h-5" />
        <span className="text-sm font-medium">{likes}</span>
      </button>
      <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors flex-1 justify-center py-2">
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm font-medium">{comments}</span>
      </button>
      <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors flex-1 justify-center py-2">
        <Share2 className="w-5 h-5" />
        <span className="text-sm font-medium">Share</span>
      </button>
    </div>
  )
}