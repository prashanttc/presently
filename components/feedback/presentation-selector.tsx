"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Check, Clock, FileText, Layers } from "lucide-react"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { changeDate } from "@/lib/utils"


interface PresentationSelectorProps {
  presentations: Presentation[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function PresentationSelector({ presentations, selectedId, onSelect }: PresentationSelectorProps) {
  const router = useRouter()

  const handleViewDetails = (id: string) => {
    router.push(`/feedback/${id}`)
  }

  return (
    <>
      <CardHeader className="pb-3">
        <CardTitle>Your Presentations</CardTitle>
        <CardDescription>Select a presentation to view feedback</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {presentations.map((presentation) => (
            <div
              key={presentation.id}
              className={`relative rounded-lg border p-3 cursor-pointer transition-all hover:shadow-md ${
                selectedId === presentation.id ? "ring-2 ring-primary border-primary/50" : "hover:border-primary/30"
              }`}
              onClick={() => {
                onSelect(presentation.id)
                handleViewDetails(presentation.id)
              }}
            >
              {selectedId === presentation.id && (
                <div className="absolute -right-2 -top-2 rounded-full gradient-bg p-1 shadow-md">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
              <div className="aspect-video relative rounded-md overflow-hidden mb-3">
                <Image
                  src={presentation.slides[0].imageUrl || "/placeholder.svg"}
                  alt={presentation.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium line-clamp-1">{presentation.title}</h3>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Layers className="h-3 w-3" />
                  <span>{presentation.slides.length} slides</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{changeDate(presentation.lastview)}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <FileText className="h-3 w-3" />
                <span>{changeDate(presentation.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </>
  )
}
