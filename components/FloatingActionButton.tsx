'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FloatingActionButton() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="fixed bottom-6 right-6 z-40">
            {/* Main FAB */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
                aria-label="Open contact options"
            >
                <span className={`text-xl transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    {isOpen ? '×' : '💬'}
                </span>
            </button>

            {/* Action Items */}
            <div className={`absolute bottom-16 right-0 space-y-2 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <Link
                    href="/contact"
                    className="flex items-center gap-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border border-gray-200 dark:border-gray-700"
                >
                    <span className="text-sm">📧</span>
                    <span className="text-sm font-medium">Contact</span>
                </Link>

                <a
                    href="https://www.linkedin.com/in/lysandergutierrez/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                    <span className="text-sm">💼</span>
                    <span className="text-sm font-medium">LinkedIn</span>
                </a>

                <a
                    href="https://github.com/leegutierrez7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                    <span className="text-sm">🐙</span>
                    <span className="text-sm font-medium">GitHub</span>
                </a>
            </div>
        </div>
    )
}
