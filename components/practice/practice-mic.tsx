"use client"

import { useState, useEffect } from "react"
import { Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PracticeMicProps {
  isRecording: boolean
  toggleRecording: () => void
  disabled: boolean
}

export function PracticeMic({ isRecording, toggleRecording, disabled }: PracticeMicProps) {
  const [audioLevel, setAudioLevel] = useState<number[]>(Array(10).fill(5))

  // Simulate audio visualization
  useEffect(() => {
    if (!isRecording) {
      setAudioLevel(Array(10).fill(5))
      return
    }

    const interval = setInterval(() => {
      setAudioLevel((prev) => prev.map(() => Math.floor(Math.random() * 40) + 5))
    }, 100)

    return () => clearInterval(interval)
  }, [isRecording])

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="text-sm font-medium text-muted-foreground mb-2">
        <span>Microphone</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button
          variant={isRecording ? "destructive" : "outline"}
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={toggleRecording}
          disabled={disabled}
        >
          {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </Button>

        {isRecording && (
          <div className="audio-visualizer">
            {audioLevel.map((height, i) => (
              <div
                key={i}
                className="audio-bar animate-wave"
                style={{
                  height: `${height}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
