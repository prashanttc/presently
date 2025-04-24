"use client";

import { useState } from "react";
import { PracticeHeader } from "@/components/practice/practice-header";
import { PracticeSlideView } from "@/components/practice/practice-slide-view";
import { PracticeControls } from "@/components/practice/practice-controls";
import { PracticeNotes } from "@/components/practice/practice-notes";
import { PracticeTimer } from "@/components/practice/practice-timer";
import { PracticeMic } from "@/components/practice/practice-mic";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useGetCurrentPpt } from "@/query/presentation";
import { toast } from "sonner";
import { slides } from "@/constant";

export default function PracticePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data, isLoading, error, isError } = useGetCurrentPpt(id || "");
  const result = !id || !data ? slides : data;
  const [isPracticing, setIsPracticing] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  if (isLoading) {
    return <div>loading</div>;
  }
  if (isError) {
    toast.error(error.message);
  }
  

  const startPractice = () => {
    setIsPracticing(true);
    setElapsedTime(0);
  };

  const stopPractice = () => {
    setIsPracticing(false);
    setIsRecording(false);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const nextSlide = () => {
    if (currentSlideIndex < result.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  return (
    <div className="space-y-6">
      <PracticeHeader
        isPracticing={isPracticing}
        onStartPractice={startPractice}
        onStopPractice={stopPractice}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PracticeSlideView
            slides={result}
            currentSlideIndex={currentSlideIndex}
            onNextSlide={nextSlide}
            onPrevSlide={prevSlide}
          />
        </div>

        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-2 divide-x">
              <PracticeTimer
                isPracticing={isPracticing}
                elapsedTime={elapsedTime}
                setElapsedTime={setElapsedTime}
              />
              <PracticeMic
                isRecording={isRecording}
                toggleRecording={toggleRecording}
                disabled={!isPracticing}
              />
            </div>
          </Card>

          <PracticeControls
            currentSlideIndex={currentSlideIndex}
            totalSlides={result.length}
            onNextSlide={nextSlide}
            onPrevSlide={prevSlide}
          />

          <PracticeNotes notes={result[currentSlideIndex].notes} />
        </div>
      </div>
    </div>
  );
}
