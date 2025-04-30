import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FeedbackHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Presentation Feedback</h1>
        <p className="text-muted-foreground">Review AI-generated feedback to improve your presentations</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" asChild className="rounded-full">
          <Link href="/practice">Practice Again</Link>
        </Button>
        <Button asChild className="rounded-full gradient-button">
          <Link href="/">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}
