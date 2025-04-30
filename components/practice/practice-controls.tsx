"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, SkipBack, SkipForward } from "lucide-react"

interface PracticeControlsProps {
  currentSlideIndex: number
  totalSlides: number
  onNextSlide: () => void
  onPrevSlide: () => void
}

export function PracticeControls({ currentSlideIndex, totalSlides, onNextSlide, onPrevSlide }: PracticeControlsProps) {
  return (
    <Card className="glass-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="icon" onClick={onPrevSlide} disabled={currentSlideIndex === 0}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1" onClick={() => {}} disabled={currentSlideIndex === 0}>
              <SkipBack className="h-3 w-3" />
              First
            </Button>

            <span className="font-medium">
              {currentSlideIndex + 1}/{totalSlides}
            </span>

            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => {}}
              disabled={currentSlideIndex === totalSlides - 1}
            >
              Last
              <SkipForward className="h-3 w-3" />
            </Button>
          </div>

          <Button variant="outline" size="icon" onClick={onNextSlide} disabled={currentSlideIndex === totalSlides - 1}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
