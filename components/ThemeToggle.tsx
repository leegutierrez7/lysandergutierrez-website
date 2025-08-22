'use client'

import { useState, useEffect } from "react"

export default function ThemeToggle() {
    const [theme, setTheme] = useState("light")

    useEffect(() => {
        const currentTheme = localStorage.getItem("theme")
        if (currentTheme) {
            setTheme(currentTheme)
        }
    }, [])

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
        localStorage.setItem("theme", theme)
    }, [theme])

    return (
        <button
            className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-all duration-200 border border-gray-300 dark:border-gray-600"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
        >
            {theme === "light" ? "�" : "☀️"}
        </button>
    )
}