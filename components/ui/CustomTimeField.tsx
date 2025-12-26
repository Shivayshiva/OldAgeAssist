"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Label } from "./label"

interface CustomTimeFieldProps {
  label: string
  value?: string
  onChange?: (value: string) => void
  error?: string
  placeholder?: string
  id?: string
}

export function CustomTimeField({
  label,
  value = "",
  onChange,
  error,
  placeholder = "Select time",
  id,
}: CustomTimeFieldProps) {
  const [open, setOpen] = useState(false)
  const [hours, setHours] = useState(12)
  const [minutes, setMinutes] = useState(0)
  const [period, setPeriod] = useState<"AM" | "PM">("AM")

  // Sync internal state with external value from react-hook-form
  useEffect(() => {
    if (value && value.includes(":")) {
      const [h, m] = value.split(":")
      const hour24 = parseInt(h)
      const minute = parseInt(m)
      
      // Convert 24-hour to 12-hour format
      const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24
      const newPeriod = hour24 >= 12 ? "PM" : "AM"
      
      setHours(hour12)
      setMinutes(minute)
      setPeriod(newPeriod)
    }
  }, [value])

  const formatTime = (h: number, m: number, p: string) => {
    const hour24 = p === "PM" && h !== 12 ? h + 12 : p === "AM" && h === 12 ? 0 : h
    return `${hour24.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
  }

  const handleTimeSelect = () => {
    const timeString = formatTime(hours, minutes, period)
    onChange?.(timeString)
    setOpen(false)
  }

  const displayTime = value
    ? (() => {
        const [h, m] = value.split(":")
        const hour24 = parseInt(h)
        const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24
        const displayPeriod = hour24 >= 12 ? "PM" : "AM"
        return `${hour12}:${m} ${displayPeriod}`
      })()
    : ""

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
              error && "border-red-500 focus-visible:ring-red-500"
            )}
          >
            <Clock className="mr-2 h-4 w-4" />
            {displayTime || placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4 space-y-4">
            <div className="text-center font-semibold text-lg">Select Time</div>
            
            {/* Clock Display */}
            <div className="flex items-center justify-center gap-2 text-4xl font-bold">
              <span>{hours.toString().padStart(2, "0")}</span>
              <span>:</span>
              <span>{minutes.toString().padStart(2, "0")}</span>
              <span className="text-2xl ml-2">{period}</span>
            </div>

            {/* Hour Selector */}
            <div>
              <Label className="text-xs text-muted-foreground">Hour</Label>
              <div className="grid grid-cols-6 gap-1 mt-1">
                {[...Array(12)].map((_, i) => {
                  const hour = i + 1
                  return (
                    <Button
                      key={hour}
                      type="button"
                      variant={hours === hour ? "default" : "outline"}
                      size="sm"
                      className="h-8"
                      onClick={() => setHours(hour)}
                    >
                      {hour}
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Minute Selector */}
            <div>
              <Label className="text-xs text-muted-foreground">Minute</Label>
              <div className="grid grid-cols-6 gap-1 mt-1">
                {[0, 15, 30, 45].map((minute) => (
                  <Button
                    key={minute}
                    type="button"
                    variant={minutes === minute ? "default" : "outline"}
                    size="sm"
                    className="h-8"
                    onClick={() => setMinutes(minute)}
                  >
                    {minute.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-6 gap-1 mt-1">
                {[5, 10, 20, 25, 35, 40, 50, 55].map((minute) => (
                  <Button
                    key={minute}
                    type="button"
                    variant={minutes === minute ? "default" : "outline"}
                    size="sm"
                    className="h-8"
                    onClick={() => setMinutes(minute)}
                  >
                    {minute}
                  </Button>
                ))}
              </div>
            </div>

            {/* AM/PM Toggle */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant={period === "AM" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setPeriod("AM")}
              >
                AM
              </Button>
              <Button
                type="button"
                variant={period === "PM" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setPeriod("PM")}
              >
                PM
              </Button>
            </div>

            {/* Confirm Button */}
            <Button type="button" className="w-full" onClick={handleTimeSelect}>
              Confirm
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
