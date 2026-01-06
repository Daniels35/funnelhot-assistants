"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative p-2 rounded-lg bg-card border border-border hover:border-hot transition-colors group"
      aria-label="Cambiar tema"
    >
      <Sun className="h-5 w-5 text-hot rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute top-2 left-2 h-5 w-5 text-hot rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  )
}