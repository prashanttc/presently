import { Activity, Clock, FileIcon as FilePresentation, Mic } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="glass-card card-color-1 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="icon-bg icon-bg-1">
              <FilePresentation className="h-5 w-5" />
            </div>
            <div>
              <p className="text-3xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Presentations</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card card-color-2 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="icon-bg icon-bg-2">
              <Mic className="h-5 w-5" />
            </div>
            <div>
              <p className="text-3xl font-bold">24</p>
              <p className="text-sm text-muted-foreground">Practice Sessions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card card-color-3 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="icon-bg icon-bg-3">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-3xl font-bold">3.5h</p>
              <p className="text-sm text-muted-foreground">Practice Time</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card card-color-4 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="icon-bg icon-bg-4">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <p className="text-3xl font-bold">+12%</p>
              <p className="text-sm text-muted-foreground">Improvement</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
