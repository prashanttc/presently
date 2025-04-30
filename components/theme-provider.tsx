"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export interface ThemeOptions {
  name: string
  id: string
  className: string
}

export const themes: ThemeOptions[] = [
  {
    name: "Purple (Default)",
    id: "purple",
    className: "theme-purple",
  },
  {
    name: "Blue",
    id: "blue",
    className: "theme-blue",
  },
  {
    name: "Green",
    id: "green",
    className: "theme-green",
  },
  {
    name: "Pink",
    id: "pink",
    className: "theme-pink",
  },
  {
    name: "Orange",
    id: "orange",
    className: "theme-orange",
  },
]

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange {...props}>
      {children}
    </NextThemesProvider>
  )
}
