'use client'

import { useEffect, useState } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // orenva is dark by default — the command-center identity. Light is an
  // explicit opt-in via the toggle.
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('orenva-theme') as 'light' | 'dark' | null
    const initial = saved || 'dark'
    setTheme(initial)
    applyTheme(initial)
  }, [])

  const applyTheme = (newTheme: 'light' | 'dark') => {
    const root = document.documentElement
    if (newTheme === 'dark') {
      root.setAttribute('data-theme', 'dark')
    } else {
      root.removeAttribute('data-theme')
    }
    localStorage.setItem('orenva-theme', newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  // Always render children — gating on a mounted flag would leave the
  // server-rendered HTML empty (no content for crawlers or first paint).
  return (
    <>
      {children}
      <ThemeToggleScript theme={theme} onToggle={toggleTheme} />
    </>
  )
}

function ThemeToggleScript({
  theme,
  onToggle,
}: {
  theme: 'light' | 'dark'
  onToggle: () => void
}) {
  useEffect(() => {
    const handleThemeToggle = () => {
      onToggle()
    }

    const toggles = document.querySelectorAll('[data-theme-toggle]')
    toggles.forEach((toggle) => {
      toggle.addEventListener('click', handleThemeToggle)
    })

    return () => {
      toggles.forEach((toggle) => {
        toggle.removeEventListener('click', handleThemeToggle)
      })
    }
  }, [onToggle])

  // Reflect the active theme to assistive tech and the visible label.
  useEffect(() => {
    const toggles = document.querySelectorAll('[data-theme-toggle]')
    toggles.forEach((toggle) => {
      toggle.setAttribute('aria-pressed', String(theme === 'dark'))
      const label = toggle.querySelector('.theme-toggle-text')
      if (label) label.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode'
    })
  }, [theme])

  return null
}
