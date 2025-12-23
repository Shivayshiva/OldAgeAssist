"use client"

import { MapPin, Users, Clock, ChevronRight, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface OpportunityCardProps {
  id: string
  title: string
  camp: string
  category: string
  image: string
  description: string
  location: string
  volunteers: number
  maxVolunteers: number
  timeCommitment: string
  date: string
  difficulty: "easy" | "moderate" | "challenging"
}

export function OpportunityCard({
  id,
  title,
  camp,
  category,
  image,
  description,
  location,
  volunteers,
  maxVolunteers,
  timeCommitment,
  date,
  difficulty,
}: OpportunityCardProps) {
  const [isSaved, setIsSaved] = useState(false)

  const difficultyColors = {
    easy: "bg-green-100 text-green-800",
    moderate: "bg-yellow-100 text-yellow-800",
    challenging: "bg-red-100 text-red-800",
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      {/* Image Section */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 flex gap-2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[difficulty]}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Camp & Category */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-primary uppercase tracking-wide">{camp}</p>
          <p className="text-xs bg-primary/10 text-primary font-medium px-2 py-1 rounded">{category}</p>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>

        {/* Details */}
        <div className="space-y-2 mb-4 py-4 border-t border-b border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-primary flex-shrink-0" />
            <span>
              {timeCommitment} • {date}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4 text-primary flex-shrink-0" />
            <span>
              {volunteers}/{maxVolunteers} volunteers
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent"
              style={{ width: `${(volunteers / maxVolunteers) * 100}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/opportunities/${id}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            View Details
            <ChevronRight className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isSaved ? "bg-accent text-white" : "border border-border text-muted-foreground hover:bg-secondary"
            }`}
          >
            <Heart className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  )
}
