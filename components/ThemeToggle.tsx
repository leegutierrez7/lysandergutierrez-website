'use client'

import { useState, useEffect } from "react"

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark' | null>(null)

    useEffect(() => {
        const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
        if (stored) {
            setTheme(stored)
            return
        }
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setTheme(prefersDark ? 'dark' : 'light')
    }, [])

    useEffect(() => {
        if (!theme) return
        document.documentElement.classList.toggle('dark', theme === 'dark')
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark')

    if (theme === null) return <div style={{ width: 40, height: 40 }} aria-hidden />

    const icon = theme === 'dark'
        ? (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>)
        : (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z" /></svg>)

    return (
        <button
            type="button"
            className="p-2 w-10 h-10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={toggle}
            aria-label="Toggle dark mode"
        >
            {icon}
        </button>
    )
}
