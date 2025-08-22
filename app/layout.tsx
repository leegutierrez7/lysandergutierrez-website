import './globals.css';
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import ThemeToggle from '../components/ThemeToggle';
import FloatingActionButton from '../components/FloatingActionButton';

export const metadata: Metadata = {
  title: 'Lysander Gutierrez | Full-Stack Software Engineer',
  description: 'Personal website of Lysander Gutierrez, Software Engineer specializing in full-stack development, cloud architecture, and scalable APIs. Experienced at NASA and Capital One.',
  keywords: 'Lysander Gutierrez, Software Engineer, Full-Stack Developer, React, Next.js, TypeScript, Go, Python, AWS, NASA, Capital One',
  authors: [{ name: 'Lysander Gutierrez' }],
  openGraph: {
    title: 'Lysander Gutierrez | Full-Stack Software Engineer',
    description: 'Personal website showcasing my experience as a Software Engineer at NASA and Capital One.',
    type: 'website',
    url: 'https://lysandergutierrez.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lysander Gutierrez | Full-Stack Software Engineer',
    description: 'Personal website showcasing my experience as a Software Engineer at NASA and Capital One.',
  }
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white font-sans">
        <header className="border-b border-gray-300 p-4 flex items-center justify-between dark:border-gray-700 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10">
          <nav className="flex gap-6">
            <Link href="/" className="hover:text-blue-600 transition-colors duration-200 font-medium">Home</Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors duration-200 font-medium">About</Link>
            <Link href="/projects" className="hover:text-blue-600 transition-colors duration-200 font-medium">Projects</Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors duration-200 font-medium">Contact</Link>
          </nav>
          <ThemeToggle />
        </header>
        <main className="max-w-4xl mx-auto p-4 min-h-screen">
          {children}
        </main>
        <FloatingActionButton />
        <footer className="border-t border-gray-300 p-4 text-center text-sm dark:border-gray-700">
          &copy; {new Date().getFullYear()} Lysander Gutierrez
        </footer>
      </body>
    </html>
  )
}