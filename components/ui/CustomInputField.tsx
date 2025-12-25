"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface CustomInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string
  error?: string
  multiline?: boolean
}

const CustomInputField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  CustomInputFieldProps
>(({ label, error, multiline, className, id, ...props }, ref) => {
  return (
    <div className="space-y-2 w-full">
      <Label htmlFor={id}>{label}</Label>
      {multiline ? (
        <Textarea
          id={id}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={cn("min-h-[100px]", className)}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <Input
          id={id}
          ref={ref as React.Ref<HTMLInputElement>}
          className={cn(className)}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
})
CustomInputField.displayName = "CustomInputField"

export { CustomInputField }