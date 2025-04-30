"use server";

import { getUserIdFromSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEBIUS_API_KEY!,
  baseURL: "https://api.studio.nebius.ai/v1",
});

type FeedbackSummary = {
  overallScore: number;
  strengths: string[];
  areasForImprovement: string[];
  pacing: { score: number; wordsPerMinute: number; notes: string };
  fillerWords: { score: number; count: number; notes: string };
  clarity: { score: number; notes: string };
  aiFeedback: string;
  slideTips: { slide: string; feedback: string }[];
  audienceQuestions: string[]; // ✅ new field
  contentMatch: number; // Additional content match score (0-100)
  error?: string;
};

export async function generatePerformanceFeedback({
  feedbackInput,
  id,
}: {
  feedbackInput: FormData;
  id: string;
}): Promise<FeedbackSummary> {
  try {
    const user = await getUserIdFromSession();
    if (!user) throw new Error("unauthorized");

    const transcription = feedbackInput.get("transcription") as string;
    const time = parseFloat(feedbackInput.get("duration") as string);

    const slidesContentRaw = await prisma.slide.findMany({
      where: { presentationId: id },
    });
    if (!transcription || !slidesContentRaw.length || isNaN(time)) {
      throw new Error("Missing required data");
    }

    const slidesContent = slidesContentRaw.map(
      (s) => s.keycontent || s.content
    );

    // AI system prompt for evaluation
    const systemPrompt = `You are a public speaking performance evaluator.
    You will receive a transcript, speaking duration (in minutes), and slide contents.
    Return a JSON object with this structure:
    
    {
      "overallScore": number (0-100),
      "strengths": [string],
      "areasForImprovement": [string],
      "pacing": {
        "score": number (0-100),
        "wordsPerMinute": number,
        "notes": string
      },
      "fillerWords": {
        "score": number (0-100),
        "count": number,
        "notes": string
      },
      "clarity": {
        "score": number (0-100),
        "notes": string
      },
      "aiFeedback": string,
      "slideTips": [{ "slide": string, "feedback": string }],
      "audienceQuestions": [string],
      "contentMatch": number
    }
    
    Generate 10 insightful, topic-relevant audience questions that could be asked after this presentation based on the slides and transcript.
    Keep the response strictly as JSON. Do not explain anything outside it.`;
    const userPrompt = `
TRANSCRIPT:
${transcription}

DURATION:
${time.toFixed(2)} minutes

SLIDES:
${slidesContent.join("\n")}
`;

    const aiResponse = await openai.chat.completions.create({
      model: "meta-llama/Meta-Llama-3.1-8B-Instruct",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
    });

    // Parsing AI response and handling error scenarios
    let parsed: FeedbackSummary = {
      overallScore: 0,
      strengths: [],
      areasForImprovement: [],
      pacing: { score: 0, wordsPerMinute: 0, notes: "Error occurred." },
      fillerWords: { score: 0, count: 0, notes: "Error occurred." },
      clarity: { score: 0, notes: "Error occurred." },
      aiFeedback: "Unable to generate AI feedback.",
      audienceQuestions: [],
      slideTips: [],
      contentMatch: 0,
    };

    try {
      const raw = aiResponse.choices[0].message.content || "";
      console.log("raw", raw);
      parsed = JSON.parse(raw);
      console.log("parsed", parsed);
    } catch (e) {
      parsed.aiFeedback = "AI response was malformed or failed.";
      console.error("Failed to parse AI feedback:", e);
    }
    const matchPercentage = calculateContentMatch(transcription, slidesContent);
    parsed.contentMatch = matchPercentage;
    await prisma.presentation.update({
      where: {
        id,
      },
      data: {
        lastview: new Date(),
      },
    });
    const existing = await prisma.feedback.findFirst({
      where: {
        presentationId: id,
      },
    });
    if (existing) {
      // Delete old slide tips
      await prisma.slideTip.deleteMany({
        where: { feedbackId: existing.id },
      });

      await prisma.feedback.update({
        where: { id: existing.id },
        data: {
          overallScore: parsed.overallScore,
          strengths: parsed.strengths,
          areasForImprovement: parsed.areasForImprovement,
          pacingScore: parsed.pacing.score,
          pacingNotes: parsed.pacing.notes,
          fillerWordCount: parsed.fillerWords.count,
          fillerWordNotes: parsed.fillerWords.notes,
          clarityNotes: parsed.clarity.notes,
          clarityScore: parsed.clarity.score,
          aiFeedback: parsed.aiFeedback,
          contentMatch: parsed.contentMatch,
          fillerWordScore: parsed.fillerWords.score,
          slideTips: {
            create: parsed.slideTips.map((tip) => ({
              slide: tip.slide,
              feedbacks: tip.feedback,
            })),
          },
          presentationId: id,
        },
      });

      return parsed;
    }

    const createdFeedback = await prisma.feedback.create({
      data: {
        overallScore: parsed.overallScore,
        strengths: parsed.strengths,
        areasForImprovement: parsed.areasForImprovement,
        pacingScore: parsed.pacing.score,
        pacingNotes: parsed.pacing.notes,
        fillerWordCount: parsed.fillerWords.count,
        fillerWordNotes: parsed.fillerWords.notes,
        clarityNotes: parsed.clarity.notes,
        audienceQuestions: parsed.audienceQuestions,
        clarityScore: parsed.clarity.score,
        aiFeedback: parsed.aiFeedback || "hehe",
        contentMatch: parsed.contentMatch,
        fillerWordScore: parsed.fillerWords.score,
        slideTips: {
          create: parsed.slideTips.map((tip) => ({
            slide: tip.slide,
            feedbacks: tip.feedback,
          })),
        },
        presentationId: id,
      },
    });
    if (!createdFeedback) {
      throw new Error("unable to create feedback");
    }
    return parsed;
  } catch (error: any) {
    console.error("AI feedback error:", error);
    return {
      overallScore: 0,
      strengths: [],
      areasForImprovement: [],
      pacing: {
        score: 0,
        wordsPerMinute: 0,
        notes: "Error occurred.",
      },
      fillerWords: {
        score: 0,
        count: 0,
        notes: "Error occurred.",
      },
      clarity: {
        score: 0,
        notes: "Error occurred.",
      },
      aiFeedback: "Unable to generate AI feedback.",
      slideTips: [],
      audienceQuestions: [],
      contentMatch: 0,
      error: error.message,
    };
  }
}

// Function to calculate content match between transcription and slides
function calculateContentMatch(
  transcription: string,
  slides: string[]
): number {
  let matchedPoints = 0;

  // Calculate how many slides' content appears in the transcription
  slides.forEach((slideContent) => {
    if (transcription.toLowerCase().includes(slideContent.toLowerCase())) {
      matchedPoints++;
    }
  });

  const matchPercentage = (matchedPoints / slides.length) * 100;
  return Math.round(matchPercentage); // Return the percentage of content match
}
