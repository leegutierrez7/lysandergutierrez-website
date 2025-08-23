import React from 'react'
import Link from 'next/link'
import ScrollAnimation from '../components/ScrollAnimation'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center py-16">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <ScrollAnimation animation="bounce">
          <div className="mb-8 text-8xl font-bold text-blue-600 dark:text-blue-400">
            404
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={200}>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Page Not Found
          </h1>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={400}>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
            Oops! The page you're looking for seems to have wandered off into
            the digital void.
          </p>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={600}>
          <div className="mb-8 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              What can you do?
            </h2>
            <ul className="space-y-2 text-left text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <span className="mr-3 h-2 w-2 rounded-full bg-blue-600"></span>
                Check the URL for typos
              </li>
              <li className="flex items-center">
                <span className="mr-3 h-2 w-2 rounded-full bg-blue-600"></span>
                Use the navigation menu above
              </li>
              <li className="flex items-center">
                <span className="mr-3 h-2 w-2 rounded-full bg-blue-600"></span>
                Try the command palette (⌘K)
              </li>
              <li className="flex items-center">
                <span className="mr-3 h-2 w-2 rounded-full bg-blue-600"></span>
                Visit one of the popular pages below
              </li>
            </ul>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={800}>
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-flex transform items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-700"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
            >
              View Projects
            </Link>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Read Blog
            </Link>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={1000}>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>
              If you think this is an error, please{' '}
              <Link
                href="/contact"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                let me know
              </Link>
              .
            </p>
          </div>
        </ScrollAnimation>

        {/* Easter egg */}
        <ScrollAnimation animation="fadeInUp" delay={1200}>
          <div className="mt-16 text-xs text-gray-400 dark:text-gray-500">
            <p>
              🎭 Fun fact: 404 was named after room 404 at CERN where the
              original web server was located.
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  )
}
