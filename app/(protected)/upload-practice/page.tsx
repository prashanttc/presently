"use client"

import { useState } from "react"
import { UploadPracticeHeader } from "@/components/upload-practice/upload-practice-header"
import { UploadSection } from "@/components/upload-practice/upload-section"
import { PracticeSection } from "@/components/upload-practice/practice-section"
import { SlideEditor } from "@/components/upload-practice/slide-editor"

export default function UploadPracticePage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isPracticing, setIsPracticing] = useState(false)

  // Mock slides data
  const slides = [
    {
      id: "1",
      title: "Introduction",
      content:
        "Welcome to our quarterly business review. Today we'll cover our performance, challenges, and goals for the next quarter.",
      notes: "Speak slowly and clearly. Make eye contact with the audience.",
    },
    {
      id: "2",
      title: "Q1 Performance",
      content:
        "We've seen a 15% increase in revenue compared to last quarter, with customer satisfaction at an all-time high of 92%.",
      notes: "Emphasize the growth numbers. Pause after mentioning the 15% increase.",
    },
    {
      id: "3",
      title: "Challenges",
      content:
        "Supply chain disruptions have affected our delivery times. We're implementing new logistics solutions to address this.",
      notes: "Be honest about the challenges but focus on the solutions we're implementing.",
    },
    {
      id: "4",
      title: "Q2 Goals",
      content:
        "Our main goals for Q2 include expanding to 2 new markets, launching our mobile app, and improving delivery times by 20%.",
      notes: "Show enthusiasm when talking about the mobile app launch.",
    },
    {
      id: "5",
      title: "Questions?",
      content: "Thank you for your attention. Any questions?",
      notes: "Prepare for potential questions about the mobile app timeline and new markets.",
    },
  ]

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
  }

  const startPractice = () => {
    setIsPracticing(true)
  }

  const stopPractice = () => {
    setIsPracticing(false)
  }

  return (
    <div className="space-y-6">
      <UploadPracticeHeader
        isPracticing={isPracticing}
        hasFile={!!uploadedFile}
        onStartPractice={startPractice}
        onStopPractice={stopPractice}
      />

      {!uploadedFile ? (
        <UploadSection onFileUpload={handleFileUpload} />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <SlideEditor slides={slides} />
          <PracticeSection isPracticing={isPracticing} currentSlide={slides[0]} />
        </div>
      )}
    </div>
  )
}
