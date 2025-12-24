"use client"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface CommonSearchProps {
  value?: string
  onSearch: (value: string) => void
  placeholder?: string
  className?: string
  debounceTime?: number
}

export function CommonSearch({
  value: initialValue = "",
  onSearch,
  placeholder = "Search...",
  className,
  debounceTime = 500,
}: CommonSearchProps) {
  const [value, setValue] = useState(initialValue)
  const onSearchRef = useRef(onSearch)

  useEffect(() => {
    onSearchRef.current = onSearch
  }, [onSearch])

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearchRef.current(value)
    }, debounceTime)

    return () => clearTimeout(timeout)
  }, [value, debounceTime])

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-10"
        placeholder={placeholder}
      />
    </div>
  )
}