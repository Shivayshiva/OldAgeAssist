"use client"

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CommonCardProps {
  title: string
  icon?: React.ReactNode
  value: string | number
  description?: React.ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
  valueClassName?: string
}

export function CommonCard({
  title,
  icon,
  value,
  description,
  className,
  headerClassName,
  contentClassName,
  valueClassName,
}: CommonCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader className={cn(headerClassName)}>
        <div className="flex items-center justify-between">
          <CardDescription className="font-medium">{title}</CardDescription>
          {icon}
        </div>
      </CardHeader>
      <CardContent className={contentClassName}>
        <div className={cn("text-2xl font-bold text-primary", valueClassName)}>{value}</div>
        {description && (
          <div className="text-xs text-muted-foreground ">{description}</div>
        )}
      </CardContent>
    </Card>
  )
}