"use client"

import { HelpCircle, MessageCircle, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Question {
  question: string
  context: string
  suggestedAnswer?: string
}

interface AudienceQuestionsProps {
  questions: Question[]
}

export function AudienceQuestions({ questions }: AudienceQuestionsProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [activeTab, setActiveTab] = useState("questions")

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers({ ...answers, [index]: value })
  }

  const handleUseSuggestion = (index: number, suggestion: string) => {
    setAnswers({ ...answers, [index]: suggestion })
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <span>AI-Generated Audience Questions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-0">
        <Tabs defaultValue="questions" value={activeTab} onValueChange={setActiveTab} className="h-full">
          <div className="border-b px-6">
            <TabsList className="w-full justify-start rounded-none border-b-0 p-0">
              <TabsTrigger
                value="questions"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                Questions ({questions.length})
              </TabsTrigger>
              <TabsTrigger
                value="answers"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                Your Answers ({Object.keys(answers).length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="questions" className="h-[calc(100%-40px)] overflow-auto p-6">
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Practice answering these potential questions that an audience might ask based on your presentation
                content.
              </p>

              {questions.map((question, index) => (
                <div key={index} className="space-y-3 rounded-lg border p-4">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="mt-0.5 h-5 w-5 text-primary" />
                    <div className="space-y-1">
                      <p className="font-medium">{question.question}</p>
                      <p className="text-xs text-muted-foreground">{question.context}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      placeholder="Type your answer here..."
                      className="min-h-[100px]"
                      value={answers[index] || ""}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                    />

                    {question.suggestedAnswer && (
                      <div className="rounded-md bg-muted p-3">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-medium">Suggested Answer:</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 gap-1 text-xs"
                            onClick={() => handleUseSuggestion(index, question.suggestedAnswer || "")}
                          >
                            <ThumbsUp className="h-3 w-3" />
                            Use Suggestion
                          </Button>
                        </div>
                        <p className="text-sm">{question.suggestedAnswer}</p>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Button size="sm" onClick={() => setActiveTab("answers")} disabled={!answers[index]}>
                        Save Answer
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="answers" className="h-[calc(100%-40px)] overflow-auto p-6">
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Review your prepared answers for potential audience questions.
              </p>

              {Object.entries(answers).map(([indexStr, answer]) => {
                const index = Number.parseInt(indexStr)
                const question = questions[index]
                return (
                  <div key={index} className="space-y-3 rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="mt-0.5 h-5 w-5 text-primary" />
                      <div className="space-y-1">
                        <p className="font-medium">{question.question}</p>
                      </div>
                    </div>
                    <div className="rounded-md bg-muted p-3">
                      <p className="text-sm">{answer}</p>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" onClick={() => setActiveTab("questions")}>
                        Edit Answer
                      </Button>
                    </div>
                  </div>
                )
              })}

              {Object.keys(answers).length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <MessageCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium">No answers yet</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Prepare answers to potential audience questions to improve your presentation readiness.
                  </p>
                  <Button className="mt-4" onClick={() => setActiveTab("questions")}>
                    Answer Questions
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
