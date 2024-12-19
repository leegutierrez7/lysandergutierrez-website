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
            className="absolute top-0 right-0 m-4 p-2 text-white bg-black rounded"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            {theme === "light" ? "🌞" : "🌚"}
        </button>
    )
}