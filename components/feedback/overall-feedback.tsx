import { CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface OverallFeedbackProps {
  overallScore: number
  pacingScore:number
  clarityScore:number
  fillerWordScore:number
  summary: string
}

export function OverallFeedback({
  overallScore,
  summary,
  pacingScore,
  clarityScore,
  fillerWordScore

}: OverallFeedbackProps) {
  return (
    <CardContent className="p-6">
      <div className="grid gap-6 md:grid-cols-2 ">
        <div>
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center rounded-full gradient-bg p-2 text-white font-bold text-xl">
              {overallScore}
            </div>
            <div className="">
              <h3 className="text-lg font-medium mb-2">Overall Score</h3>
              <p className="text-muted-foreground">{summary}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Pace</span>
              <span className="font-medium">{pacingScore}%</span>
            </div>
            <Progress value={pacingScore} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>FillerWords</span>
              <span className="font-medium">{fillerWordScore}%</span>
            </div>
            <Progress value={fillerWordScore} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Clarity</span>
              <span className="font-medium">{clarityScore}%</span>
            </div>
            <Progress value={clarityScore} className="h-2" />
          </div>
        </div>
      </div>
    </CardContent>
  )
}
