import { Button } from "@/components/ui/button"
import Link from "next/link"

export function UploadHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Presentation</h1>
        <p className="text-muted-foreground">Upload your presentation slides to practice with</p>
      </div>
      <Button asChild>
        <Link href="/practice">Go to Practice</Link>
      </Button>
    </div>
  )
}
