"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface Option {
  value: string
  label: string
}

interface CustomSelectFieldProps {
  label: string
  value?: string
  onValueChange: (value: string) => void
  options: Option[]
  placeholder?: string
  error?: string
  id?: string
}

export function CustomSelectField({
  label,
  value,
  onValueChange,
  options,
  placeholder = "Select option",
  error,
  id,
}: CustomSelectFieldProps) {
  return (
    <div className="space-y-2 w-full">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}