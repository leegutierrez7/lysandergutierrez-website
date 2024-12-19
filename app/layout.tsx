import './globals.css';
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import ThemeToggle from '../components/ThemeToggle';

export const metadata: Metadata = {
  title: 'Lysander Gutierrez',
  description: 'Personal website of Lysander Gutierrez, Software Engineer.',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white font-sans">
        <header className="border-b border-gray-300 p-4 flex items-center justify-between dark:border-gray-700">
          <nav className="flex gap-4">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/about" className="hover:text-blue-600">About</Link>
            <Link href="/projects" className="hover:text-blue-600">Projects</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          </nav>
          <ThemeToggle />
        </header>
        <main className="max-w-3x1 mx-auto p-4">
          {children}
        </main>
        <footer className="border-t border-gray-300 p-4 text-center text-sm dark:border-gray-700">
          &copy; {new Date().getFullYear()} Lysander Gutierrez
        </footer>
      </body>
    </html>
  )
}