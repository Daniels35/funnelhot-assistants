"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-9 h-9" />
  }

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark"

    if (!document.startViewTransition) {
      setTheme(nextTheme)
      return
    }

    document.startViewTransition(() => {
      setTheme(nextTheme)
    })
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-card border border-border hover:border-hot transition-colors cursor-pointer group overflow-hidden"
      aria-label="Cambiar tema"
    >
      <Sun className="h-5 w-5 text-hot rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute top-2 left-2 h-5 w-5 text-hot rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  )
}