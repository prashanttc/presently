import { Clock, MessageSquare, VolumeX } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface MetricsProps {
  metrics: {
    pacingScore:number 
    pacingNotes: string
    fillerWordScore:number
    fillerWordCount:number
      fillerWordNotes: string
      clarityScore: number
       clarityNotes: string
}
}

export function FeedbackMetrics({ metrics }: MetricsProps) {
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pacing</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className={`text-2xl font-bold ${getScoreColor(metrics.pacingScore)}`}>
              {metrics.pacingScore}/100
            </span>
          </div>
          <Progress
            value={metrics.pacingScore}
            className={getProgressColor(metrics.pacingScore)}
          />
          <CardDescription className="text-xs">{metrics.pacingNotes}</CardDescription>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Filler Words</CardTitle>
          <VolumeX className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className={`text-2xl font-bold ${getScoreColor(metrics.fillerWordScore)}`}>
              {metrics.fillerWordScore}/100
            </span>
            <span className="text-sm text-muted-foreground">{metrics.fillerWordCount} detected</span>
          </div>
          <Progress
            value={metrics.fillerWordScore}
            className={getProgressColor(metrics.fillerWordScore)}
          />
          <CardDescription className="text-xs">{metrics.fillerWordNotes}</CardDescription>
        </CardContent>
      </Card>

      {/* <Card className="glass-card">
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
      </Card> */}

      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Clarity</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className={`text-2xl font-bold ${getScoreColor(metrics.clarityScore)}`}>
              {metrics.clarityScore}/100
            </span>
          </div>
          <Progress
            value={metrics.clarityScore}
            className={getProgressColor(metrics.clarityScore)}
          />
          <CardDescription className="text-xs">{metrics.clarityNotes}</CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}
