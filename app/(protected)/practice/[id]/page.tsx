"use client";

import { useState, useRef } from "react";
import { PracticeHeader } from "@/components/practice/practice-header";
import { PracticeSlideView } from "@/components/practice/practice-slide-view";
import { PracticeControls } from "@/components/practice/practice-controls";
import { PracticeNotes } from "@/components/practice/practice-notes";
import { PracticeTimer } from "@/components/practice/practice-timer";
import { PracticeMic } from "@/components/practice/practice-mic";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useGenerateFeedback, useGetCurrentPpt } from "@/query/presentation";
import { toast } from "sonner";
import { slides } from "@/constant";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { Loading } from "@/components/loading";

export default function PracticePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data, isLoading, error, isError } = useGetCurrentPpt(id || "");
  const {
    mutate,
    isError: errorgenerating,
    error: errorgen,
    isPending,
  } = useGenerateFeedback();
  const result = !id || !data ? slides : data;
  const [isPracticing, setIsPracticing] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const feedback = (feedbackInput: FormData) => {
    mutate({ feedbackInput, id });
  };

  const transcribeAudio = async () => {
    setLoading(true);
    if (!audioUrl) {
      toast.error("No recording found");
      return;
    }
    const audioBlob = await fetch(audioUrl).then((r) => r.blob());
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.webm");

    const response = await fetch("/api/transcribe", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    const transcript = result.text;
    toast.success("Recorded successfully!");
    const feedbackInput = new FormData();
    feedbackInput.append("transcription", transcript);
    feedbackInput.append("duration", elapsedTime.toString());
    feedback(feedbackInput);
    setLoading(false);
  };

  if (isError || errorgenerating) {
    toast.error(error?.message || errorgen?.message);
  }

  if (isPending || isLoading || loading) {
    return (
     <Loading/>
    );
  }
  router.push(`/feedback/${id}`);

  const startPractice = async () => {
    setIsPracticing(true);
    if (isRecording) {
      stopRecording();
    } else {
      await startRecording();
    }
    setIsRecording(!isRecording);
    setElapsedTime(0);
  };

  const stopPractice = () => {
    setIsPracticing(false);
    setIsRecording(false);
    stopRecording();
  };

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      await startRecording();
    }
    setIsRecording(!isRecording);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.current.push(event.data);
      });

      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        audioChunks.current = [];
      });

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
    } catch (err) {
      console.error("Could not start recording", err);
      toast.error("Microphone access denied or unavailable!");
    }
  };

  const deleteRecording = () => {
    setAudioUrl(null);
    setIsRecording(false);
    audioChunks.current = [];
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
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
        transcribe={transcribeAudio}
        id={id}
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

          {audioUrl && (
            <Card className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Recording Preview:</p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={deleteRecording}
                >
                  Delete
                </Button>
              </div>
              <audio controls src={audioUrl} className="w-full" />
            </Card>
          )}

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
