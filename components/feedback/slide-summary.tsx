import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  import { Separator } from "@/components/ui/separator"
  import { ScrollArea } from "@/components/ui/scroll-area"
  
  interface FeedbackSummaryProps {
    summary: SlideTips[]
  }
  
  interface SlideTips {
    slide: string
    feedbacks: string
  }
  
  export function SlideSummary({ summary }: FeedbackSummaryProps) {
    return (
      <Card className="glass-card shadow-lg border border-muted bg-white/50 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Slide Summary</CardTitle>
          <CardDescription>
            A concise overview of your slides with personalized AI feedback.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-2">
            <div className="space-y-6">
              {summary.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-muted/30 p-4 hover:bg-muted/40 transition-all border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-medium text-foreground">
                      Slide: <span className="font-semibold">{item.slide}</span>
                    </h3>
                    <Badge variant="outline">#{index + 1}</Badge>
                  </div>
                  <Separator className="my-2" />
                  <p className="text-sm text-green-400">
                    {item.feedbacks}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    )
  }
  