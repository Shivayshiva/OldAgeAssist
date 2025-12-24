"use client"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface CommonFilterTabProps {
  label?: string
  icon?: LucideIcon
  items: string[]
  selectedItem: string
  onSelect: (item: string) => void
  className?: string
}

export function CommonFilterTab({
  label,
  icon: Icon,
  items,
  selectedItem,
  onSelect,
  className,
}: CommonFilterTabProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4" />}
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              selectedItem === item || (item === "All" && !selectedItem)
                ? "bg-primary text-white"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            )}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}