// app/actions/generatePerformanceFeedback.ts
"use server";

import { getUserIdFromSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

type FeedbackSummary = {
  overallScore: number;
  strengths: string[];
  areasForImprovement: string[];
  pacing: { score: number; wordsPerMinute: number; notes: string };
  fillerWords: { score: number; count: number; notes: string };
  clarity: { score: number; notes: string };
  error?: string;
};

const fillerWordList = [
  "um",
  "uh",
  "like",
  "you know",
  "so",
  "actually",
  "basically",
];

export async function generatePerformanceFeedback({
  feedbackInput,
  id,
}: {
  feedbackInput: FormData;
  id: string;
}): Promise<FeedbackSummary> {
  try {
    const user = await getUserIdFromSession();
    if (!user) throw new Error("aunauthorized");

    const transcription = feedbackInput.get("transcription") as string;
    const time = feedbackInput.get("duration") as string;
     const slidesContentRaw = await prisma.slide.findMany({
      where:{
        presentationId:id
      }
     })
    if (!transcription || !slidesContentRaw) {
      throw new Error("Missing transcription or slides content");
    }

    const slidesContent = slidesContentRaw.map((slide)=>slide.content);

    const words: Array<{ confidence: number }> = transcription || [];
    const totalWords = words.length;
    const sumConfidence = words.reduce((sum, w) => sum + w.confidence, 0);
    const averageConfidence = totalWords ? sumConfidence / totalWords : 0;

    const wordsPerMinute = totalWords / Number(time);
    const pacingScore =
      wordsPerMinute >= 120 && wordsPerMinute <= 160 ? 85 : 70;

    const fillerWordCount = words.filter((word) =>
      fillerWordList.includes(word.toLowerCase())
    ).length;
    const fillerWordScore =
      fillerWordCount < 10 ? 90 : fillerWordCount < 20 ? 75 : 60;

    let matchedPoints = 0;
    slidesContent.forEach((point) => {
      if (transcription.toLowerCase().includes(point.toLowerCase())) {
        matchedPoints++;
      }
    });
    const clarityScore = Math.round(
      (matchedPoints / slidesContent.length) * 100
    );

    const strengths: string[] = [];
    const improvements: string[] = [];

    if (clarityScore > 80) {
      strengths.push("Clear coverage of slide key points");
    } else {
      improvements.push("Missed explaining some key points from slides");
    }

    if (fillerWordScore > 80) {
      strengths.push("Minimal use of filler words");
    } else {
      improvements.push("Reduce use of filler words like 'um', 'uh', etc.");
    }

    if (pacingScore > 80) {
      strengths.push("Good pacing and rhythm");
    } else {
      improvements.push("Adjust speaking pace for better clarity");
    }

    if (clarityScore > 90 && pacingScore > 85) {
      strengths.push("Strong and engaging delivery overall");
    }

    const overallScore = Math.round(
      (pacingScore + fillerWordScore + clarityScore) / 3
    );

    return {
      overallScore,
      strengths,
      areasForImprovement: improvements,
      pacing: {
        score: pacingScore,
        wordsPerMinute,
        notes:
          pacingScore > 80
            ? "Your speaking pace was within the ideal range."
            : "Consider slowing down or speeding up depending on your audience.",
      },
      fillerWords: {
        score: fillerWordScore,
        count: fillerWordCount,
        notes:
          fillerWordScore > 80
            ? "Very few filler words detected, great job!"
            : "Try pausing instead of using filler words.",
      },
      clarity: {
        score: clarityScore,
        notes:
          clarityScore > 80
            ? "Most slide points were covered clearly."
            : "Consider covering all important points from the slides.",
      },
    };
  } catch (error: any) {
    console.error("Error generating performance feedback:", error);

    return {
      overallScore: 0,
      strengths: [],
      areasForImprovement: [],
      pacing: {
        score: 0,
        wordsPerMinute: 0,
        notes: "An error occurred while analyzing pacing.",
      },
      fillerWords: {
        score: 0,
        count: 0,
        notes: "An error occurred while analyzing filler words.",
      },
      clarity: {
        score: 0,
        notes: "An error occurred while analyzing clarity.",
      },
      error: error.message || "Unknown error occurred",
    };
  }
}
