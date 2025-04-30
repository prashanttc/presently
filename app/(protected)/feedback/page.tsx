"use client";

import { useState } from "react";
import { FeedbackHeader } from "@/components/feedback/feedback-header";
import { PresentationSelector } from "@/components/feedback/presentation-selector";
import { Card } from "@/components/ui/card";
import { useGetAllPpt } from "@/query/presentation";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

export default function FeedbackPage() {
  const [selectedPresentation, setSelectedPresentation] = useState<
    string | null
  >(null);
  const { data, isPending } = useGetAllPpt();

  const handleSelectPresentation = (id: string) => {
    setSelectedPresentation(id);
  };
  if (isPending) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2Icon className="h-10 w-10 animate-spin" />
      </div>
    );
  }
  if (!data) {
    toast.error("no data found");
    return;
  }
  return (
    <div className="space-y-6">
      <FeedbackHeader />

      <Card className="glass-card">
        <PresentationSelector
          presentations={data}
          selectedId={selectedPresentation}
          onSelect={handleSelectPresentation}
        />
      </Card>

      {!selectedPresentation && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full gradient-bg p-6 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M2 3h20"></path>
              <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"></path>
              <path d="m7 21 5-5 5 5"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Select a Presentation</h2>
          <p className="text-muted-foreground max-w-md">
            Choose one of your uploaded presentations to view detailed feedback
            and insights.
          </p>
        </div>
      )}
    </div>
  );
}
