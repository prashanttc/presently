import { AlertCircle, Clock, MessageSquare, VolumeX } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface MetricsProps {
  metrics: {
    pacing: {
      score: number
      feedback: string
    }
    fillerWords: {
      score: number
      count: number
      feedback: string
    }
    confidence: {
      score: number
      feedback: string
    }
    clarity: {
      score: number
      feedback: string
    }
  }
}

export function FeedbackMetrics({ metrics }: MetricsProps) {
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pacing</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className={`text-2xl font-bold ${getScoreColor(metrics.pacing.score)}`}>
              {metrics.pacing.score}/100
            </span>
          </div>
          <Progress
            value={metrics.pacing.score}
            className="h-2"
            indicatorClassName={getProgressColor(metrics.pacing.score)}
          />
          <CardDescription className="text-xs">{metrics.pacing.feedback}</CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Filler Words</CardTitle>
          <VolumeX className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className={`text-2xl font-bold ${getScoreColor(metrics.fillerWords.score)}`}>
              {metrics.fillerWords.score}/100
            </span>
            <span className="text-sm text-muted-foreground">{metrics.fillerWords.count} detected</span>
          </div>
          <Progress
            value={metrics.fillerWords.score}
            className="h-2"
            indicatorClassName={getProgressColor(metrics.fillerWords.score)}
          />
          <CardDescription className="text-xs">{metrics.fillerWords.feedback}</CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Confidence</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className={`text-2xl font-bold ${getScoreColor(metrics.confidence.score)}`}>
              {metrics.confidence.score}/100
            </span>
          </div>
          <Progress
            value={metrics.confidence.score}
            className="h-2"
            indicatorClassName={getProgressColor(metrics.confidence.score)}
          />
          <CardDescription className="text-xs">{metrics.confidence.feedback}</CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Clarity</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className={`text-2xl font-bold ${getScoreColor(metrics.clarity.score)}`}>
              {metrics.clarity.score}/100
            </span>
          </div>
          <Progress
            value={metrics.clarity.score}
            className="h-2"
            indicatorClassName={getProgressColor(metrics.clarity.score)}
          />
          <CardDescription className="text-xs">{metrics.clarity.feedback}</CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}
