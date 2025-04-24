import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TranscriptItem {
  time: string
  text: string
  feedback: string
}

interface FeedbackTranscriptProps {
  transcript: TranscriptItem[]
}

export function FeedbackTranscript({ transcript }: FeedbackTranscriptProps) {
  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>Transcript & Feedback</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-0">
        <Tabs defaultValue="transcript" className="h-full">
          <div className="border-b px-6">
            <TabsList className="w-full justify-start rounded-none border-b-0 p-0">
              <TabsTrigger
                value="transcript"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                Transcript
              </TabsTrigger>
              <TabsTrigger
                value="feedback"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                Feedback
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="transcript" className="h-[calc(100%-40px)] overflow-auto p-6">
            <div className="space-y-4">
              {transcript.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="feedback" className="h-[calc(100%-40px)] overflow-auto p-6">
            <div className="space-y-4">
              {transcript.map((item, index) => (
                <div key={index} className="space-y-1 rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                  <div className="mt-2 rounded-md bg-muted p-2">
                    <p className="text-sm font-medium">Feedback:</p>
                    <p className="text-sm">{item.feedback}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
