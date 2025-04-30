"use client"

import { useTheme } from "next-themes"
import { Check, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { themes } from "@/components/theme-provider"
import { useEffect, useState } from "react"

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [colorTheme, setColorTheme] = useState("purple")

  // Ensure component is mounted before rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    // Get the color theme from localStorage or default to purple
    const savedColorTheme = localStorage.getItem("color-theme") || "purple"
    setColorTheme(savedColorTheme)

    // Apply the theme class to the document
    document.documentElement.classList.forEach((className) => {
      if (className.startsWith("theme-")) {
        document.documentElement.classList.remove(className)
      }
    })
    document.documentElement.classList.add(`theme-${savedColorTheme}`)
  }, [])

  const handleThemeChange = (themeId: string) => {
    setColorTheme(themeId)
    localStorage.setItem("color-theme", themeId)

    // Remove all theme classes and add the selected one
    themes.forEach((t:any) => {
      document.documentElement.classList.remove(t.className)
    })
    document.documentElement.classList.add(`theme-${themeId}`)
  }

  if (!mounted) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Palette className="h-5 w-5 sidebar-icon" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="">
        <DropdownMenuLabel>Color Theme</DropdownMenuLabel>
        <div className="px-2 py-2 theme-selector">
          {themes.map((t:any) => (
            <button
              key={t.id}
              className={`theme-option theme-option-${t.id} ${colorTheme === t.id ? "active" : ""}`}
              onClick={() => handleThemeChange(t.id)}
              aria-label={`Set color theme to ${t.name}`}
            >
              {colorTheme === t.id && <Check className="absolute inset-0 m-auto h-4 w-4 text-white" />}
            </button>
          ))}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Display Mode</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
          {theme === "light" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
          {theme === "dark" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
          {theme === "system" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
