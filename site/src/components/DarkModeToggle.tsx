'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if dark mode is already set
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleDarkMode = () => {
    const newIsDark = !isDark
    if (newIsDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    setIsDark(newIsDark)
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-4 right-4 p-3 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors shadow-lg z-50"
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}