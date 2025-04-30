"use client"

import { useState } from "react"
import { PracticeHeader } from "@/components/practice/practice-header"
import { PracticeSlideView } from "@/components/practice/practice-slide-view"
import { PracticeControls } from "@/components/practice/practice-controls"
import { PracticeNotes } from "@/components/practice/practice-notes"
import { PracticeTimer } from "@/components/practice/practice-timer"
import { PracticeMic } from "@/components/practice/practice-mic"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { slides } from "@/constant"

export default function PracticePage() {
  const [isPracticing, setIsPracticing] = useState(false)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)


  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1)
    }
  }

  return (
    <div className="space-y-6">
      {/* <PracticeHeader isPracticing={isPracticing} onStartPractice={startPractice} onStopPractice={stopPractice}  /> */}
      
      <div className="w-full flex items-end justify-end">
        <Button asChild><Link href={"/upload"}>Upload</Link></Button>
        
        </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
        <PracticeSlideView
            slides={slides}
            currentSlideIndex={currentSlideIndex}
            onNextSlide={nextSlide}
            onPrevSlide={prevSlide}
          />
        </div>

        <div className="space-y-6">
          <Card className="overflow-hidden glass-card">
            <div className="grid grid-cols-2 divide-x">
              <PracticeTimer isPracticing={isPracticing} elapsedTime={elapsedTime} setElapsedTime={setElapsedTime} />
              <PracticeMic isRecording={isRecording} toggleRecording={toggleRecording} disabled={!isPracticing} />
            </div>
          </Card>

          <PracticeControls
            currentSlideIndex={currentSlideIndex}
            totalSlides={slides.length}
            onNextSlide={nextSlide}
            onPrevSlide={prevSlide}
          />

          <PracticeNotes notes={slides[currentSlideIndex].notes} />
        </div>
      </div>
    </div>
  )
}
