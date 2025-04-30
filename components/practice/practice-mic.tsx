import { useState, useEffect, useRef } from "react"
import { Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "../ui/card"

interface PracticeMicProps {
  isRecording: boolean
  toggleRecording: () => void
  disabled: boolean
}

export function PracticeMic({ isRecording, toggleRecording, disabled }: PracticeMicProps) {
  const [audioLevel, setAudioLevel] = useState<number[]>(Array(10).fill(5))
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null)

  useEffect(() => {
    if (!isRecording) {
      setAudioLevel(Array(10).fill(5))

      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
      return
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const analyser = audioContext.createAnalyser()
      const source = audioContext.createMediaStreamSource(stream)

      source.connect(analyser)
      analyser.fftSize = 256

      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      audioContextRef.current = audioContext
      analyserRef.current = analyser
      dataArrayRef.current = dataArray
      sourceRef.current = source

      const updateAudioLevel = () => {
        if (!analyserRef.current || !dataArrayRef.current) return

        analyserRef.current.getByteFrequencyData(dataArrayRef.current)

        const values = Array.from(dataArrayRef.current).slice(0, 10)
        setAudioLevel(values.map((v) => Math.max(5, v / 5)))

        requestAnimationFrame(updateAudioLevel)
      }

      updateAudioLevel()
    }).catch((err) => {
      console.error("Microphone access denied:", err)
    })

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
    }
  }, [isRecording])

  return (
    <div className="flex flex-col items-center justify-center p-4 ">
      <div className="text-sm font-medium text-muted-foreground mb-2">
        <span>Microphone</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button
          variant={isRecording ? "destructive" : "outline"}
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={toggleRecording}
          disabled={disabled}
        >
          {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </Button>

        {isRecording && (
          <div className="audio-visualizer flex items-end gap-1 h-12 mt-2">
            {audioLevel.map((height, i) => (
              <div
                key={i}
                className="audio-bar bg-indigo-500 rounded"
                style={{
                  width: "4px",
                  height: `${height}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
