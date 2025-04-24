import { FeedbackHeader } from "@/components/feedback/feedback-header"
import { FeedbackMetrics } from "@/components/feedback/feedback-metrics"
import { FeedbackTranscript } from "@/components/feedback/feedback-transcript"
import { AudienceQuestions } from "@/components/feedback/audience-questions"
import { FeedbackSummary } from "@/components/feedback/feedback-summary"
import { FeedbackVisualizations } from "@/components/feedback/feedback-visualizations"

export default function FeedbackPage() {
  // Mock feedback data
  const feedbackData = {
    presentationTitle: "Q1 Sales Report",
    date: "April 20, 2025",
    duration: "8:32",
    metrics: {
      pacing: {
        score: 85,
        feedback:
          "Your speaking pace was generally good, averaging 145 words per minute, which is within the ideal range of 120-160 wpm. However, you tended to speed up during technical explanations.",
      },
      fillerWords: {
        score: 72,
        count: 18,
        feedback:
          "You used filler words like 'um' and 'uh' 18 times during your presentation. Try to replace these with brief pauses instead.",
        instances: ["um", "uh", "like", "you know", "sort of"],
      },
      confidence: {
        score: 90,
        feedback:
          "Your voice projection and tone conveyed confidence throughout most of the presentation. Your energy level was consistent and engaging.",
      },
      clarity: {
        score: 88,
        feedback:
          "Your explanations were clear and well-structured. Consider simplifying some technical terms for broader audience understanding.",
      },
    },
    summary: {
      strengths: [
        "Clear and concise explanation of quarterly goals",
        "Effective use of data to support key points",
        "Strong opening and closing statements",
        "Consistent energy level throughout the presentation",
      ],
      improvements: [
        "Reduce filler words, especially during technical explanations",
        "Slow down when presenting complex data",
        "Provide more context for industry-specific terms",
        "Include more pauses after important points",
      ],
      overallScore: 84,
    },
    transcript: [
      {
        time: "00:12",
        text: "Good morning everyone, and thank you for joining our quarterly business review. Today we'll be covering our performance for Q1, the challenges we faced, and our goals for the upcoming quarter.",
        feedback: "Strong opening that clearly outlines the agenda.",
      },
      {
        time: "01:45",
        text: "As you can see from this chart, we've seen a 15% increase in revenue compared to last quarter, with customer satisfaction at an all-time high of 92%.",
        feedback: "Good data presentation, but you could pause longer here to let the numbers sink in.",
      },
      {
        time: "03:22",
        text: "Um, one of the main challenges we faced was, uh, supply chain disruptions that affected our delivery times. We're implementing new logistics solutions to address this issue.",
        feedback: "Several filler words here. Try replacing with a thoughtful pause.",
      },
      {
        time: "05:47",
        text: "Our main goals for Q2 include expanding to 2 new markets, launching our mobile app, and improving delivery times by 20%.",
        feedback: "Clear and concise explanation of goals. Good emphasis on key metrics.",
      },
      {
        time: "07:58",
        text: "Thank you for your attention. I'm happy to answer any questions you might have about our plans or performance.",
        feedback: "Strong conclusion that invites engagement.",
      },
    ],
    audienceQuestions: [
      {
        question: "Can you elaborate on the specific markets you're planning to expand into during Q2?",
        context: "Based on your mention of expanding to 2 new markets",
        suggestedAnswer:
          "We're focusing on the Canadian and German markets based on our market research showing strong demand for our products and favorable regulatory environments.",
      },
      {
        question: "What features will be included in the initial release of the mobile app?",
        context: "Based on your mention of launching a mobile app",
        suggestedAnswer:
          "The initial release will include core features like order tracking, account management, and product browsing. We plan to add payment processing and loyalty rewards in subsequent updates.",
      },
      {
        question: "How do you plan to achieve the 20% improvement in delivery times?",
        context: "Based on your delivery time improvement goal",
        suggestedAnswer:
          "We're implementing a new logistics management system, partnering with additional regional carriers, and optimizing our warehouse operations to reduce processing time.",
      },
    ],
    paceData: [
      { time: "00:00", pace: 130 },
      { time: "01:00", pace: 145 },
      { time: "02:00", pace: 160 },
      { time: "03:00", pace: 175 },
      { time: "04:00", pace: 150 },
      { time: "05:00", pace: 140 },
      { time: "06:00", pace: 135 },
      { time: "07:00", pace: 145 },
      { time: "08:00", pace: 130 },
    ],
    fillerWordsData: [
      { word: "um", count: 8 },
      { word: "uh", count: 5 },
      { word: "like", count: 3 },
      { word: "you know", count: 1 },
      { word: "sort of", count: 1 },
    ],
  }

  return (
    <div className="space-y-6">
      <FeedbackHeader
        title={feedbackData.presentationTitle}
        date={feedbackData.date}
        duration={feedbackData.duration}
      />

      <FeedbackSummary summary={feedbackData.summary} />

      <FeedbackMetrics metrics={feedbackData.metrics} />

      <FeedbackVisualizations paceData={feedbackData.paceData} fillerWordsData={feedbackData.fillerWordsData} />

      <div className="grid gap-6 lg:grid-cols-2">
        <FeedbackTranscript transcript={feedbackData.transcript} />
        <AudienceQuestions questions={feedbackData.audienceQuestions} />
      </div>
    </div>
  )
}
