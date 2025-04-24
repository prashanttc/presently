"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Edit, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Slide {
  id: string
  title: string
  content: string
  notes: string
}

interface SlideEditorProps {
  slides: Slide[]
}

export function SlideEditor({ slides }: SlideEditorProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [editedNotes, setEditedNotes] = useState(slides[currentSlideIndex].notes)

  const currentSlide = slides[currentSlideIndex]

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1)
      setEditedNotes(slides[currentSlideIndex - 1].notes)
      setIsEditing(false)
    }
  }

  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1)
      setEditedNotes(slides[currentSlideIndex + 1].notes)
      setIsEditing(false)
    }
  }

  const toggleEditing = () => {
    setIsEditing(!isEditing)
  }

  const handleSaveNotes = () => {
    // In a real app, you would save the notes to your state or backend
    setIsEditing(false)
  }

  return (
    <Card className="flex h-[600px] flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl">
          Slide {currentSlideIndex + 1} of {slides.length}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevSlide} disabled={currentSlideIndex === 0}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextSlide}
            disabled={currentSlideIndex === slides.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-6">
        <Tabs defaultValue="slide" className="h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="slide">Slide</TabsTrigger>
            <TabsTrigger value="notes">Speaker Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="slide" className="h-[calc(100%-40px)] overflow-auto">
            <div className="flex h-full flex-col items-center justify-center rounded-lg border bg-card p-6 text-center">
              <h3 className="mb-4 text-2xl font-bold">{currentSlide.title}</h3>
              <p className="text-lg">{currentSlide.content}</p>
            </div>
          </TabsContent>
          <TabsContent value="notes" className="h-[calc(100%-40px)]">
            <div className="h-full space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Speaker Notes</h3>
                {!isEditing ? (
                  <Button variant="ghost" size="sm" onClick={toggleEditing}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Notes
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" onClick={handleSaveNotes}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                )}
              </div>
              {isEditing ? (
                <Textarea
                  value={editedNotes}
                  onChange={(e) => setEditedNotes(e.target.value)}
                  className="h-[calc(100%-60px)] min-h-[200px]"
                  placeholder="Add your speaker notes here..."
                />
              ) : (
                <div className="rounded-lg border bg-muted p-4">
                  <p>{currentSlide.notes}</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-4">
        <div className="flex w-full items-center justify-between">
          <span className="text-sm text-muted-foreground">{currentSlide.title}</span>
          <span className="text-sm font-medium">
            {currentSlideIndex + 1}/{slides.length}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}
