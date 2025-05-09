"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

interface Slide {
  id: string
  title: string |null 
  content: string
  slideNumber:number
  notes: string|null
  imageUrl:string
}

interface PracticeSlideViewProps {
  slides: Slide[]
  currentSlideIndex: number
  onNextSlide: () => void
  onPrevSlide: () => void
}
export function PracticeSlideView({ slides, currentSlideIndex, onNextSlide, onPrevSlide }: PracticeSlideViewProps) {
  const currentSlide = slides[currentSlideIndex]
  const progress = ((currentSlideIndex + 1) / slides.length) * 100

  return (
    <Card className="flex h-[600px] flex-col glass-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
        <CardTitle className="text-xl">
          Slide {currentSlideIndex + 1} of {slides.length}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onPrevSlide} disabled={currentSlideIndex === 0}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onNextSlide}
            disabled={currentSlideIndex === slides.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-6">
        <div className="flex h-full flex-col items-center justify-center rounded-lg border p-6 text-center">
          {currentSlide.imageUrl?
          <Image src={currentSlide.imageUrl} height={1000} width={1000} alt={currentSlide.title||'title'}/>:
          <p className="text-lg">{currentSlide.content}</p>
        }

        </div>
      </CardContent>
      <CardFooter className="border-t  px-6 py-4">
        <div className="w-full space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>
              {currentSlideIndex + 1}/{slides.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardFooter>
    </Card>
  )
}
