import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="heading-xl">Welcome back, John</h1>
        <p className="body-md text-muted-foreground mt-1">Ready to practice your presentations?</p>
      </div>
      <Button asChild className="gap-1 flex btn-color rounded-full bg-accent hover:bg-accent/90">
        <Link href="/upload">
          <Plus className="h-4 w-4" />
          New Presentation
        </Link>
      </Button>
    </div>
  )
}
