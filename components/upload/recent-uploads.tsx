"use client"

import { useState } from "react"
import { FileIcon as FilePresentation, MoreHorizontal, Play, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function RecentUploads() {
  // Mock data for recent uploads
  const [uploads, setUploads] = useState([
    {
      id: "1",
      title: "Q1 Sales Report.pptx",
      date: "April 20, 2025",
      slides: 12,
      size: "2.4 MB",
    },
    {
      id: "2",
      title: "Product Launch Strategy.pptx",
      date: "April 18, 2025",
      slides: 18,
      size: "3.8 MB",
    },
    {
      id: "3",
      title: "Team Onboarding.pptx",
      date: "April 15, 2025",
      slides: 8,
      size: "1.5 MB",
    },
  ])

  const handleDelete = (id: string) => {
    setUploads(uploads.filter((upload) => upload.id !== id))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Recent Uploads</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {uploads.map((upload) => (
          <Card key={upload.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="line-clamp-1">{upload.title}</CardTitle>
                <CardDescription>
                  {upload.slides} slides · {upload.size}
                </CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href="/practice">
                      <Play className="mr-2 h-4 w-4" />
                      Practice
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleDelete(upload.id)} className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 py-2">
                <FilePresentation className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Uploaded on {upload.date}</span>
              </div>
              <Button asChild className="mt-2 w-full gap-2">
                <Link href="/practice">
                  <Play className="h-4 w-4" />
                  Practice Now
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
