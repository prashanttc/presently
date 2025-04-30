"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PresentationFeedbackHeader } from "@/components/feedback/presentation-feedback-header"
import { OverallFeedback } from "@/components/feedback/overall-feedback"
import { FeedbackSummary } from "@/components/feedback/feedback-summary"
import { FeedbackMetrics } from "@/components/feedback/feedback-metrics"
import { useGetFeedbackById } from "@/query/presentation"
import { QuestionsFeedback } from "@/components/feedback/questions-feedback"
import { Loading } from "@/components/loading"
import { SlideSummary } from "@/components/feedback/slide-summary"

export default function PresentationFeedbackPage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overall")

    const id = params.id as string
    const{data:feedbackData ,isPending}=useGetFeedbackById(id)


  if (!feedbackData) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className=" text-center">
          <p className="text-lg">no feedback found!!</p>
        </div>
      </div>
    )
  }
  if (isPending) {
    return (
   <Loading/>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.push("/feedback")} className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to Feedback</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{feedbackData.presentation.title}</h1>
            <p className="text-muted-foreground">Detailed feedback and improvement suggestions</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 rounded-full">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="gap-2 rounded-full">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button size="sm" className="rounded-full gradient-button">
            Practice Again
          </Button>
        </div>
      </div>

      <PresentationFeedbackHeader presentation={feedbackData.presentation} />
      <FeedbackSummary summary={feedbackData} />

      <Card className="glass-card">
        <Tabs defaultValue="overall" value={activeTab} onValueChange={setActiveTab}>
          <div className="px-4 pt-4 overflow-x-auto">
            <TabsList className="grid min-w-max grid-cols-6 mb-4">
              <TabsTrigger value="overall">Overall</TabsTrigger>  
              <TabsTrigger value="performance">performance metrics</TabsTrigger>  
              <TabsTrigger value="questions">Questions</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overall" className="m-0">
            <OverallFeedback
              overallScore={feedbackData.overallScore}
              fillerWordScore={feedbackData.fillerWordScore}
              pacingScore={feedbackData.pacingScore}
              clarityScore={feedbackData.clarityScore}
              summary={feedbackData.aiFeedback}
            />
          </TabsContent>

          <TabsContent value="performance" className="m-0">
          <FeedbackMetrics metrics={feedbackData} />
          </TabsContent>


          <TabsContent value="questions" className="m-0">
            <QuestionsFeedback audienceQuestions={feedbackData.audienceQuestions} />
          </TabsContent>
          {/* <TabsContent value="questions" className="m-0">
            <AudienceQuestions audienceQuestions={feedbackData.audienceQuestions} />
          </TabsContent> */}
        </Tabs>
      </Card>
      <SlideSummary summary={feedbackData.slideTips} />

    </div>
  )
}
