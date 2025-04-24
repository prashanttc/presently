import Link from "next/link"
import { FileIcon as FilePresentation, MoreHorizontal, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

interface PresentationCardProps {
  presentation: {
    id: string
    title: string
    slides: number
    duration: string
    lastPracticed: string
    progress: number
  }
}

export function PresentationCard({ presentation }: PresentationCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="line-clamp-1">{presentation.title}</CardTitle>
          <CardDescription>
            {presentation.slides} slides · {presentation.duration}
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
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <FilePresentation className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Last practiced: {presentation.lastPracticed}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Practice progress</span>
            <span className="font-medium">{presentation.progress}%</span>
          </div>
          <Progress value={presentation.progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-3">
        <Button asChild className="w-full gap-2">
          <Link href={`/upload-practice?id=${presentation.id}`}>
            <Play className="h-4 w-4" />
            Practice Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
