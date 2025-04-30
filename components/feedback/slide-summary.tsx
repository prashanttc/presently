import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface FeedbackSummaryProps {
  summary: SlideTips[]
}
interface SlideTips{
    slide:string
    feedbacks:String
}

export function SlideSummary({ summary }: FeedbackSummaryProps) {
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
          <span>Slide Summary</span>
        </CardTitle>
        <CardDescription>Overall feedback of your presentation slides</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="flex items-center gap-2 font-medium text-green-400 mb-3">
              slide title
            </h3>
            <ul className="space-y-2">
              {summary.map((questions, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-success mt-0.5">•</span>
                  <span >{questions.slide}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-medium text-green-500 mb-3">
feedbacks               </h3>
            <ul className="space-y-2">
              {summary.map((improvement, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-warning mt-0.5">•</span>
                  <span>{improvement.feedbacks}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
