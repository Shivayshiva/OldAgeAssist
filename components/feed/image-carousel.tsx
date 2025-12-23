"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import GlobalImage from "../GlobalImage"

interface ImageCarouselProps {
  images: string[]
  title: string
}

export function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  // Single image - no carousel needed
  if (images.length === 1) {
    return (
      <div className="relative w-full aspect-square bg-muted overflow-hidden">
        <Image src={images[0] || "/placeholder.svg"} alt={title} fill className="w-full h-full object-cover" />
      </div>
    )
  }

  // Multiple images - show carousel
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative w-full aspect-square bg-muted overflow-hidden">
      <GlobalImage  
        src={images[currentIndex] || "/placeholder.svg"}
        alt={`${title} - Image ${currentIndex + 1}`}
        width={40}
        height={40}
        fill={true}
        className="w-full h-full object-cover transition-opacity duration-300"/>

      <button
        onClick={prevSlide}
        aria-label="Previous image"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors z-10"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next image"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors z-10"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Image Counter */}
      <div className="absolute bottom-3 right-3 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to image ${index + 1}`}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
