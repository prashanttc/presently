"use client"

import type React from "react"

import { useState } from "react"
import { FileUp, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface UploadSectionProps {
  onFileUpload: (file: File) => void
}

export function UploadSection({ onFileUpload }: UploadSectionProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0])
    }
  }

  return (
    <Card className={`border-2 border-dashed ${dragActive ? "border-primary" : "border-muted-foreground/25"}`}>
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <div
          className="flex w-full flex-col items-center justify-center gap-4 py-10"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="rounded-full bg-primary/10 p-4">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Upload your presentation</h3>
            <p className="text-sm text-muted-foreground">Drag and drop your .pptx file here, or click to browse</p>
          </div>
          <div className="grid w-full max-w-sm gap-2.5">
            <Label htmlFor="file-upload" className="sr-only">
              Choose a file
            </Label>
            <div className="flex items-center gap-2">
              <Input id="file-upload" type="file" accept=".pptx" className="hidden" onChange={handleChange} />
              <Button asChild className="w-full gap-2">
                <label htmlFor="file-upload">
                  <FileUp className="h-4 w-4" />
                  Browse Files
                </label>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Supported format: .pptx (max 50MB)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
