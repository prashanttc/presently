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

export default function PracticePage() {
  const [isPracticing, setIsPracticing] = useState(false)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const { toast } = useToast()

  // Mock slides data
  const slides = [
    {
      id: "1",
      title: "Introduction",
      content:
        "Welcome to our quarterly business review. Today we'll cover our performance, challenges, and goals for the next quarter.",
      notes: "Speak slowly and clearly. Make eye contact with the audience.",
      slideNumber:1,
      imageUrl:''
    },
    // {
    //   id: "2",
    //   title: "Q1 Performance",
    //   content:
    //     "We've seen a 15% increase in revenue compared to last quarter, with customer satisfaction at an all-time high of 92%.",
    //   notes: "Emphasize the growth numbers. Pause after mentioning the 15% increase.",
    // },
    // {
    //   id: "3",
    //   title: "Challenges",
    //   content:
    //     "Supply chain disruptions have affected our delivery times. We're implementing new logistics solutions to address this.",
    //   notes: "Be honest about the challenges but focus on the solutions we're implementing.",
    // },
    // {
    //   id: "4",
    //   title: "Q2 Goals",
    //   content:
    //     "Our main goals for Q2 include expanding to 2 new markets, launching our mobile app, and improving delivery times by 20%.",
    //   notes: "Show enthusiasm when talking about the mobile app launch.",
    // },
    // {
    //   id: "5",
    //   title: "Questions?",
    //   content: "Thank you for your attention. Any questions?",
    //   notes: "Prepare for potential questions about the mobile app timeline and new markets.",
    // },
  ]


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
          <Card className="overflow-hidden">
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
