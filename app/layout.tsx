import './globals.css'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import ThemeToggle from '../components/ThemeToggle'
import StructuredData from '../components/StructuredData'
import { isBlogEnabled } from '../lib/featureFlags'

export const metadata: Metadata = {
  title: 'Lysander Gutierrez | Full-Stack Software Engineer',
  description:
    'Personal website of Lysander Gutierrez, Software Engineer specializing in full-stack development, cloud architecture, and scalable APIs. Experienced at NASA and Capital One.',
  keywords: [
    'Lysander Gutierrez',
    'Software Engineer',
    'Full-Stack Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Go',
    'Python',
    'AWS',
    'NASA',
    'Capital One',
  ],
  authors: [{ name: 'Lysander Gutierrez' }],
  alternates: { canonical: 'https://lysandergutierrez.com' },
  openGraph: {
    title: 'Lysander Gutierrez | Full-Stack Software Engineer',
    description:
      'Personal website showcasing my experience as a Software Engineer at NASA and Capital One.',
    type: 'website',
    url: 'https://lysandergutierrez.com',
    siteName: 'Lysander Gutierrez Portfolio',
    images: [
      {
        url: 'https://lysandergutierrez.com/headshot.jpg',
        width: 1200,
        height: 630,
        alt: 'Lysander Gutierrez - Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lysander Gutierrez | Full-Stack Software Engineer',
    description:
      'Personal website showcasing my experience as a Software Engineer at NASA and Capital One.',
    images: ['https://lysandergutierrez.com/headshot.jpg'],
  },
  metadataBase: new URL('https://lysandergutierrez.com'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#0a0a0f"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="color-scheme" content="light dark" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className="bg-white font-sans text-black antialiased selection:bg-blue-600 selection:text-white dark:bg-gray-900 dark:text-white">
        <StructuredData type="website" />
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-blue-600 px-4 py-2 text-white focus:not-sr-only focus:absolute focus:left-2 focus:top-2"
        >
          Skip to content
        </a>
        <header
          className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-300 bg-white/80 p-4 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80"
          role="banner"
        >
          <nav className="flex gap-6" aria-label="Primary">
            <Link
              href="/"
              className="font-medium transition-colors duration-200 hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="font-medium transition-colors duration-200 hover:text-blue-600"
            >
              About
            </Link>
            <Link
              href="/projects"
              className="font-medium transition-colors duration-200 hover:text-blue-600"
            >
              Projects
            </Link>
            {isBlogEnabled() && (
              <Link
                href="/blog"
                className="font-medium transition-colors duration-200 hover:text-blue-600"
              >
                Blog
              </Link>
            )}
            <Link
              href="/contact"
              className="font-medium transition-colors duration-200 hover:text-blue-600"
            >
              Contact
            </Link>
          </nav>
          <ThemeToggle />
        </header>
        <main id="main" className="mx-auto min-h-screen max-w-4xl p-4">
          {children}
        </main>
        <footer
          className="border-t border-gray-300 p-4 text-center text-sm dark:border-gray-700"
          role="contentinfo"
        >
          &copy; {new Date().getFullYear()} Lysander Gutierrez
        </footer>
      </body>
    </html>
  )
}
