import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Manage and practice your presentations</p>
      </div>
      <Button asChild>
        <Link href="/upload-practice" className="gap-1">
          <Plus className="h-4 w-4" />
          New Presentation
        </Link>
      </Button>
    </div>
  )
}
