import './globals.css';
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import ThemeToggle from '../components/ThemeToggle';

export const metadata: Metadata = {
  title: 'Lysander Gutierrez | Full-Stack Software Engineer',
  description: 'Personal website of Lysander Gutierrez, Software Engineer specializing in full-stack development, cloud architecture, and scalable APIs. Experienced at NASA and Capital One.',
  keywords: ['Lysander Gutierrez', 'Software Engineer', 'Full-Stack Developer', 'React', 'Next.js', 'TypeScript', 'Go', 'Python', 'AWS', 'NASA', 'Capital One'],
  authors: [{ name: 'Lysander Gutierrez' }],
  alternates: { canonical: 'https://lysandergutierrez.com' },
  openGraph: {
    title: 'Lysander Gutierrez | Full-Stack Software Engineer',
    description: 'Personal website showcasing my experience as a Software Engineer at NASA and Capital One.',
    type: 'website',
    url: 'https://lysandergutierrez.com',
    siteName: 'Lysander Gutierrez Portfolio'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lysander Gutierrez | Full-Stack Software Engineer',
    description: 'Personal website showcasing my experience as a Software Engineer at NASA and Capital One.',
  },
  metadataBase: new URL('https://lysandergutierrez.com')
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0a0a0f" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light dark" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white font-sans antialiased selection:bg-blue-600 selection:text-white">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-600 text-white px-4 py-2 rounded-md z-50">Skip to content</a>
        <header className="border-b border-gray-300 p-4 flex items-center justify-between dark:border-gray-700 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10" role="banner">
          <nav className="flex gap-6" aria-label="Primary">
            <Link href="/" className="hover:text-blue-600 transition-colors duration-200 font-medium">Home</Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors duration-200 font-medium">About</Link>
            <Link href="/projects" className="hover:text-blue-600 transition-colors duration-200 font-medium">Projects</Link>
            <Link href="/blog" className="hover:text-blue-600 transition-colors duration-200 font-medium">Blog</Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors duration-200 font-medium">Contact</Link>
          </nav>
          <ThemeToggle />
        </header>
        <main id="main" className="max-w-4xl mx-auto p-4 min-h-screen">
          {children}
        </main>
        <footer className="border-t border-gray-300 p-4 text-center text-sm dark:border-gray-700" role="contentinfo">
          &copy; {new Date().getFullYear()} Lysander Gutierrez
        </footer>
      </body>
    </html>
  )
}