"use client"

import { Button } from "@/components/ui/button"
import { Pause, Play } from "lucide-react"
import Link from "next/link"

interface PracticeHeaderProps {
  isPracticing: boolean
  onStartPractice: () => void
  onStopPractice: () => void
}

export function PracticeHeader({ isPracticing, onStartPractice, onStopPractice }: PracticeHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Practice Mode</h1>
        <p className="text-muted-foreground">Practice your presentation with real-time feedback</p>
      </div>
      <div className="flex gap-2">
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
        <Button variant="outline" asChild>
          <Link href="/upload">Upload New</Link>
        </Button>
      </div>
    </div>
  )
}
