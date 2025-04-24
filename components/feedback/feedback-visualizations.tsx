"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface FeedbackVisualizationsProps {
  paceData: { time: string; pace: number }[]
  fillerWordsData: { word: string; count: number }[]
}

export function FeedbackVisualizations({ paceData, fillerWordsData }: FeedbackVisualizationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Visualizations</CardTitle>
        <CardDescription>Visual analysis of your presentation metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pace">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pace">Speaking Pace</TabsTrigger>
            <TabsTrigger value="fillerWords">Filler Words</TabsTrigger>
          </TabsList>
          <TabsContent value="pace" className="pt-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Words per minute over time</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Ideal speaking pace is between 120-160 words per minute
              </p>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={paceData}>
                    <XAxis dataKey="time" />
                    <YAxis domain={[100, 180]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="pace"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="fillerWords" className="pt-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Filler word frequency</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Distribution of filler words used during your presentation
              </p>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={fillerWordsData}>
                    <XAxis dataKey="word" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
