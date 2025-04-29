"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Pause, Send } from "lucide-react"
import Link from "next/link"
import { ConfirmationDialog } from "../ui/confirmation-dialog"

interface PracticeHeaderProps {
  isPracticing: boolean
  onStartPractice: () => void
  onStopPractice: () => void
  id:string|null
  transcribe:()=>void
}

export function PracticeHeader({ isPracticing, onStartPractice, onStopPractice ,transcribe,id}: PracticeHeaderProps) {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const handleSubmitClick = () => {
    setIsConfirmDialogOpen(true)
  }

  const handleConfirmSubmit = () => {
    transcribe()
  }
  const handlestart=()=>{
onStartPractice()
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Practice Mode</h1>
        <p className="text-muted-foreground">Practice your presentation with real-time feedback</p>
      </div>
    {id?
    <>
    <div className="flex gap-2">
      {isPracticing ? (
        <Button variant="destructive" onClick={onStopPractice} className="gap-2 rounded-full">
          <Pause className="h-4 w-4" />
          Stop Practice
        </Button>
      ) : ( <Button variant="default" onClick={handlestart} className="gap-2 btn-color rounded-full">
          Start
        </Button>
        
      )}
      <Button variant="default" onClick={handleSubmitClick} className="gap-2 btn-color rounded-full">
          <Send className="h-4 w-4" />
          Submit Practice
        </Button>
    
    </div>

    <ConfirmationDialog
      isOpen={isConfirmDialogOpen}
      onClose={() => setIsConfirmDialogOpen(false)}
      onConfirm={handleConfirmSubmit}
      title="Submit Practice Session"
      description="Are you sure you want to submit your practice session? This action cannot be undone."
      confirmText="Submit"
      cancelText="Cancel"
    /></>:(
<Button asChild><Link href='/upload'>upload</Link></Button>
    )}
    </div>
  )
}
