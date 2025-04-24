"use client"

import { useEffect, useState } from "react"
import { Mic, MicOff, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Slide {
  id: string
  title: string
  content: string
  notes: string
}

interface PracticeSectionProps {
  isPracticing: boolean
  currentSlide: Slide
}

export function PracticeSection({ isPracticing, currentSlide }: PracticeSectionProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null)

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    if (isPracticing) {
      const interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
      setTimerInterval(interval)
    } else {
      if (timerInterval) {
        clearInterval(timerInterval)
        setTimerInterval(null)
      }
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval)
      }
    }
  }, [isPracticing])

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  return (
    <Card className="flex h-[600px] flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Practice Mode</span>
          <div className="flex items-center gap-2 text-base font-normal">
            <Timer className="h-4 w-4" />
            <span>{formatTime(elapsedTime)}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        {isPracticing ? (
          <div className="flex h-full flex-col items-center justify-center gap-6 p-6 text-center">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">{currentSlide.title}</h3>
              <p className="text-muted-foreground">Speak clearly and at a steady pace</p>
            </div>

            <div className="relative flex h-40 w-40 items-center justify-center">
              <div
                className={`absolute inset-0 rounded-full ${isRecording ? "animate-pulse bg-red-500/20" : "bg-muted"}`}
              ></div>
              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="icon"
                className="relative h-24 w-24 rounded-full"
                onClick={toggleRecording}
              >
                {isRecording ? <MicOff className="h-10 w-10" /> : <Mic className="h-10 w-10" />}
              </Button>
            </div>

            <div className="w-full space-y-2">
              <div className="flex justify-between text-sm">
                <span>Slide progress</span>
                <span>1/5</span>
              </div>
              <Progress value={20} className="h-2" />
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Mic className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Ready to Practice</h3>
            <p className="text-sm text-muted-foreground">
              Click "Start Practice" to begin your presentation practice session
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-4">
        <div className="w-full space-y-2">
          <h4 className="font-medium">Practice Tips:</h4>
          <ul className="list-inside list-disc text-sm text-muted-foreground">
            <li>Speak clearly and at a consistent pace</li>
            <li>Make eye contact with your imaginary audience</li>
            <li>Use the speaker notes as a guide, not a script</li>
            <li>Practice your transitions between slides</li>
          </ul>
        </div>
      </CardFooter>
    </Card>
  )
}
