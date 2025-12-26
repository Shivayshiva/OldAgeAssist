"use client"

import * as React from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, Upload, Trash2 } from "lucide-react"

interface CustomUploadFieldProps {
  label: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemove: () => void
  uploading: boolean
  error?: string
  id?: string
}

export function CustomUploadField({
  label,
  value,
  onChange,
  onRemove,
  uploading,
  error,
  id,
}: CustomUploadFieldProps) {
  return (
    <div className="space-y-2 w-full">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex flex-col gap-4">
        {value ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
            <Image src={value} alt="Preview" fill className="object-cover" loading="lazy" />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-2 top-2 size-8 z-10"
              onClick={onRemove}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ) : (
          <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed bg-muted/50">
            <label
              htmlFor={id || "image-upload"}
              className="flex cursor-pointer flex-col items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              {uploading ? <Loader2 className="size-8 animate-spin" /> : <Upload className="size-8" />}
              <span className="text-sm font-medium">
                {uploading ? "Uploading..." : "Click to upload image"}
              </span>
              <Input
                id={id || "image-upload"}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onChange}
                disabled={uploading}
              />
            </label>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}