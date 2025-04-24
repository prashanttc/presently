"use client"

import { useEffect } from "react"
import { Timer } from "lucide-react"

interface PracticeTimerProps {
  isPracticing: boolean
  elapsedTime: number
  setElapsedTime: (time: number) => void
}

export function PracticeTimer({ isPracticing, elapsedTime, setElapsedTime }: PracticeTimerProps) {
  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isPracticing) {
      interval = setInterval(() => {
        setElapsedTime(elapsedTime + 1)
      }, 1000)
    } else if (interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPracticing, elapsedTime, setElapsedTime])

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
        <Timer className="h-4 w-4" />
        <span>Elapsed Time</span>
      </div>
      <div className="text-3xl font-bold tabular-nums">{formatTime(elapsedTime)}</div>
    </div>
  )
}
