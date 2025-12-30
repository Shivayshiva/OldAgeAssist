"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"
import { cn } from "@/lib/utils"

export type FilterOption = {
  key: string
  title: string
  options: { label: string; value: string }[]
}

interface CustomGridViewProps<T> {
  data: T[]
  renderCard: (item: T) => React.ReactNode
  searchKey: keyof T
  searchPlaceholder?: string
  filters?: FilterOption[]
  emptyMessage?: string
  className?: string
}

export function CustomGridView<T extends Record<string, any>>({
  data,
  renderCard,
  searchKey,
  searchPlaceholder = "Search...",
  filters = [],
  emptyMessage = "No items found.",
  className,
}: CustomGridViewProps<T>) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

  // Filter and search logic
  const filteredData = useMemo(() => {
    let result = data

    // Apply search
    if (searchQuery) {
      result = result.filter((item) =>
        String(item[searchKey])
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    }

    // Apply filters
    Object.entries(activeFilters).forEach(([key, value]) => {
        if (value && value !== "all") {
        result = result.filter((item) => item[key] === value)
      }
    })

    return result
  }, [data, searchQuery, activeFilters, searchKey])

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const clearFilter = (key: string) => {
    setActiveFilters((prev) => {
      const updated = { ...prev }
      delete updated[key]
      return updated
    })
  }

  const clearAllFilters = () => {
    setActiveFilters({})
    setSearchQuery("")
  }

  const hasActiveFilters = searchQuery || Object.keys(activeFilters).length > 0

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Filters */}
        {filters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <Select
                key={filter.key}
                value={activeFilters[filter.key] || ""}
                onValueChange={(value) => handleFilterChange(filter.key, value)}
              >
                <SelectTrigger className="w-[140px]">
                  <Filter className="size-4 mr-2" />
                  <SelectValue placeholder={filter.title} />
                </SelectTrigger>
                <SelectContent>
                  {filter.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-9"
              >
                <X className="size-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Active Filter Tags */}
      {Object.keys(activeFilters).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, value]) => {
            const filter = filters.find((f) => f.key === key)
            const option = filter?.options.find((o) => o.value === value)
            return (
              <div
                key={key}
                className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm"
              >
                <span className="font-medium">{filter?.title}:</span>
                <span>{option?.label}</span>
                <button
                  onClick={() => clearFilter(key)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="size-3" />
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredData.length} of {data.length} items
      </div>

      {/* Grid View */}
      {filteredData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">{emptyMessage}</p>
          {hasActiveFilters && (
            <Button
              variant="link"
              onClick={clearAllFilters}
              className="mt-2"
            >
              Clear all filters
            </Button>
          )}
        </div>
      ) : (
        <div
          className={cn(
            "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
            className
          )}
        >
          {filteredData.map((item, index) => (
            <div key={index}>{renderCard(item)}</div>
          ))}
        </div>
      )}
    </div>
  )
}
