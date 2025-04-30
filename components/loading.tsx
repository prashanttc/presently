import { cn } from "@/lib/utils"

interface LoadingProps {
  className?: string
  size?: "sm" | "md" | "lg"
  text?: string
}

export function Loading({ className, size = "md", text }: LoadingProps) {
  const sizeClasses = {
    sm: "h-1 w-1",
    md: "h-2 w-2",
    lg: "h-3 w-3",
  }

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className="loading-dots">
        <div className={sizeClasses[size]} />
        <div className={sizeClasses[size]} />
        <div className={sizeClasses[size]} />
      </div>
      {text && <p className="mt-3 text-sm text-white">{text}</p>}
    </div>
  )
}
