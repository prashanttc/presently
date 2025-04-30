import { Card, CardContent } from "@/components/ui/card"
import { changeDate } from "@/lib/utils"
import { Clock, FileText, Layers, Calendar } from "lucide-react"

interface PresentationFeedbackHeaderProps {
presentation:Presentation
}

export function PresentationFeedbackHeader({ presentation }: PresentationFeedbackHeaderProps) {
  return (
    <Card className="glass-card">
      <CardContent className="p-4">
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full gradient-bg p-2">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Created On</p>
              <p className="font-medium">{changeDate(presentation.createdAt)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full gradient-bg p-2">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Slides</p>
              <p className="font-medium">{presentation.slides.length} slides</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full gradient-bg p-2">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-medium">{'15 min'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full gradient-bg p-2">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Practiced</p>
              <p className="font-medium">{changeDate(presentation.lastview)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
