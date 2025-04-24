import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface FeedbackSummaryProps {
  summary: {
    strengths: string[]
    improvements: string[]
    overallScore: number
  }
}

export function FeedbackSummary({ summary }: FeedbackSummaryProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500"
    if (score >= 70) return "text-amber-500"
    return "text-red-500"
  }

  const getProgressColor = (score: number) => {
    if (score >= 90) return "bg-green-500"
    if (score >= 70) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Performance Summary</span>
          <span className={`text-2xl ${getScoreColor(summary.overallScore)}`}>{summary.overallScore}/100</span>
        </CardTitle>
        <CardDescription>Overall assessment of your presentation performance</CardDescription>
        <Progress
          value={summary.overallScore}
          className="h-2 mt-2"
          indicatorClassName={getProgressColor(summary.overallScore)}
        />
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="flex items-center gap-2 font-medium text-green-500 mb-3">
              <CheckCircle2 className="h-5 w-5" />
              Strengths
            </h3>
            <ul className="space-y-2">
              {summary.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500 mt-0.5">•</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-medium text-amber-500 mb-3">
              <XCircle className="h-5 w-5" />
              Areas for Improvement
            </h3>
            <ul className="space-y-2">
              {summary.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
