"use client";

import { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle } from "lucide-react";

interface QuestionsFeedbackProps {
  audienceQuestions: string[];
}

export function QuestionsFeedback({ audienceQuestions }: QuestionsFeedbackProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [activeQuestion, setActiveQuestion] = useState(0);

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers({ ...answers, [index]: value });
  };

  return (
    <CardContent className="p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-medium mb-4">Potential Audience Questions</h3>
          <div className="space-y-3">
            {audienceQuestions.map((q, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  activeQuestion === index
                    ? "gradient-card-subtle border-primary/30"
                    : "hover:bg-muted/50"
                }`}
                onClick={() => setActiveQuestion(index)}
              >
                <p className="font-medium text-sm">{q}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg gradient-card-subtle">
            <div className="flex items-start gap-3">
              <HelpCircle className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">{audienceQuestions[activeQuestion]}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Your Answer</h3>
            <Textarea
              placeholder="Type your answer here..."
              className="min-h-[120px] glass-card"
              value={answers[activeQuestion] || ""}
              onChange={(e) => handleAnswerChange(activeQuestion, e.target.value)}
            />
          </div>
        </div>
      </div>
    </CardContent>
  );
}
