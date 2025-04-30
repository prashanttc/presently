import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface FeedbackSummaryProps {
  summary: {
    strengths: string[]
    areasForImprovement: string[]
    overallScore: number
  }
}

export function FeedbackSummary({ summary }: FeedbackSummaryProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success"
    if (score >= 70) return "text-warning"
    return "text-destructive"
  }

  const getProgressColor = (score: number) => {
    if (score >= 90) return "bg-success"
    if (score >= 70) return "bg-warning"
    return "bg-destructive"
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Performance Summary</span>
          <span className={`text-2xl ${getScoreColor(summary.overallScore)}`}>{summary.overallScore}/100</span>
        </CardTitle>
        <CardDescription>Overall assessment of your presentation performance</CardDescription>
        <Progress
          value={summary.overallScore}
          className={getProgressColor(summary.overallScore)}
        />
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="flex items-center gap-2 font-medium text-green-400 mb-3">
              <CheckCircle2 className="h-5 w-5 " />
              Strengths
            </h3>
            <ul className="space-y-2">
              {summary.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-success mt-0.5">•</span>
                  <span >{strength}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-medium text-red-500 mb-3">
              <XCircle className="h-5 w-5" />
              Areas for Improvement
            </h3>
            <ul className="space-y-2">
              {summary.areasForImprovement.map((improvement, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-warning mt-0.5">•</span>
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
