"use client"

import { ArrowLeft, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface UploadPracticeHeaderProps {
  isPracticing: boolean
  hasFile: boolean
  onStartPractice: () => void
  onStopPractice: () => void
}

export function UploadPracticeHeader({
  isPracticing,
  hasFile,
  onStartPractice,
  onStopPractice,
}: UploadPracticeHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to dashboard</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload & Practice</h1>
          <p className="text-muted-foreground">Upload your presentation and start practicing</p>
        </div>
      </div>

      {hasFile && (
        <Button
          variant={isPracticing ? "destructive" : "default"}
          onClick={isPracticing ? onStopPractice : onStartPractice}
          className="gap-2"
        >
          {isPracticing ? (
            <>
              <Pause className="h-4 w-4" />
              Stop Practice
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Start Practice
            </>
          )}
        </Button>
      )}
    </div>
  )
}
