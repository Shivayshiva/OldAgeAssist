import { cn } from "@/lib/utils"

interface CustomTitleProps {
  title: string
  description?: string
  className?: string
  titleClassName?: string
  descriptionClassName?: string
}

export function CustomTitle({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: CustomTitleProps) {
  return (
    <div className={className}>
      <h1 className={cn("text-3xl font-bold text-balance from-primary", titleClassName)}>{title}</h1>
      {description && <p className={cn("text-muted-foreground mt-2 text-pretty", descriptionClassName)}>{description}</p>}
    </div>
  )
}