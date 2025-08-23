'use client'

import { useState } from 'react'
import { Mail, Check, AlertCircle, Loader2 } from 'lucide-react'

interface NewsletterResponse {
  success: boolean
  message: string
  error?: string
}

interface NewsletterSignupProps {
  className?: string
  variant?: 'inline' | 'modal' | 'sidebar'
  size?: 'sm' | 'md' | 'lg'
}

export default function NewsletterSignup({
  className = '',
  variant = 'inline',
  size = 'md',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data: NewsletterResponse = await response.json()

      if (data.success) {
        setStatus('success')
        setMessage(data.message || 'Successfully subscribed to newsletter!')
        setEmail('')

        // Track subscription event
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'newsletter_signup', {
            event_category: 'engagement',
            event_label: email,
          })
        }
      } else {
        setStatus('error')
        setMessage(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please check your connection and try again.')
      console.error('Newsletter subscription error:', error)
    }
  }

  const resetStatus = () => {
    setStatus('idle')
    setMessage('')
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'text-sm',
          input: 'px-3 py-2 text-sm',
          button: 'px-3 py-2 text-sm',
          title: 'text-lg',
          description: 'text-sm',
        }
      case 'lg':
        return {
          container: 'text-lg',
          input: 'px-4 py-3 text-base',
          button: 'px-6 py-3 text-base',
          title: 'text-2xl',
          description: 'text-base',
        }
      default:
        return {
          container: 'text-base',
          input: 'px-4 py-2.5 text-base',
          button: 'px-4 py-2.5 text-base',
          title: 'text-xl',
          description: 'text-base',
        }
    }
  }

  const sizeClasses = getSizeClasses()

  const renderInlineVariant = () => (
    <div className={`${className} ${sizeClasses.container}`}>
      <div className="mb-3 flex items-center space-x-2">
        <Mail className="h-5 w-5 text-blue-600" />
        <h3
          className={`font-semibold text-gray-900 dark:text-white ${sizeClasses.title}`}
        >
          Stay Updated
        </h3>
      </div>
      <p
        className={`mb-4 text-gray-600 dark:text-gray-300 ${sizeClasses.description}`}
      >
        Get notified about new blog posts and project updates.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={`flex-1 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${sizeClasses.input}`}
            disabled={status === 'loading' || status === 'success'}
            onFocus={resetStatus}
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`flex items-center justify-center space-x-2 rounded-lg bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses.button}`}
          >
            {status === 'loading' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : status === 'success' ? (
              <Check className="h-4 w-4" />
            ) : (
              <Mail className="h-4 w-4" />
            )}
            <span>
              {status === 'loading'
                ? 'Subscribing...'
                : status === 'success'
                  ? 'Subscribed!'
                  : 'Subscribe'}
            </span>
          </button>
        </div>

        {message && (
          <div
            className={`flex items-center space-x-2 ${
              status === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {status === 'success' ? (
              <Check className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span className="text-sm">{message}</span>
          </div>
        )}
      </form>

      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        No spam, unsubscribe at any time.
      </p>
    </div>
  )

  const renderModalVariant = () => (
    <div
      className={`w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800 ${className}`}
    >
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
          <Mail className="h-8 w-8 text-blue-600" />
        </div>
        <h3
          className={`mb-2 font-bold text-gray-900 dark:text-white ${sizeClasses.title}`}
        >
          Subscribe to Newsletter
        </h3>
        <p
          className={`text-gray-600 dark:text-gray-300 ${sizeClasses.description}`}
        >
          Stay updated with my latest blog posts, projects, and tech insights.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className={`w-full rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${sizeClasses.input}`}
          disabled={status === 'loading' || status === 'success'}
          onFocus={resetStatus}
        />

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className={`flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses.button}`}
        >
          {status === 'loading' ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : status === 'success' ? (
            <Check className="h-5 w-5" />
          ) : (
            <Mail className="h-5 w-5" />
          )}
          <span>
            {status === 'loading'
              ? 'Subscribing...'
              : status === 'success'
                ? 'Subscribed!'
                : 'Subscribe'}
          </span>
        </button>

        {message && (
          <div
            className={`flex items-center justify-center space-x-2 ${
              status === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {status === 'success' ? (
              <Check className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span className="text-center text-sm">{message}</span>
          </div>
        )}
      </form>

      <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        No spam, unsubscribe at any time. Your email is safe with us.
      </p>
    </div>
  )

  const renderSidebarVariant = () => (
    <div
      className={`rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 p-6 dark:border-blue-800 dark:from-blue-900/10 dark:to-purple-900/10 ${className}`}
    >
      <div className="mb-4 text-center">
        <Mail className="mx-auto mb-3 h-12 w-12 text-blue-600" />
        <h3
          className={`mb-2 font-bold text-gray-900 dark:text-white ${sizeClasses.title}`}
        >
          Newsletter
        </h3>
        <p
          className={`text-gray-600 dark:text-gray-300 ${sizeClasses.description}`}
        >
          Weekly updates on web development and tech trends.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email"
          className={`w-full rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${sizeClasses.input}`}
          disabled={status === 'loading' || status === 'success'}
          onFocus={resetStatus}
        />

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className={`flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses.button}`}
        >
          {status === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : status === 'success' ? (
            <Check className="h-4 w-4" />
          ) : (
            <Mail className="h-4 w-4" />
          )}
          <span className="text-sm">
            {status === 'loading'
              ? 'Subscribing...'
              : status === 'success'
                ? 'Subscribed!'
                : 'Subscribe'}
          </span>
        </button>

        {message && (
          <div
            className={`text-center ${
              status === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            <span className="text-xs">{message}</span>
          </div>
        )}
      </form>
    </div>
  )

  switch (variant) {
    case 'modal':
      return renderModalVariant()
    case 'sidebar':
      return renderSidebarVariant()
    default:
      return renderInlineVariant()
  }
}

// Newsletter API route handler
export const newsletterAPIHandler = async (
  email: string
): Promise<NewsletterResponse> => {
  try {
    // Example integration with ConvertKit
    const CONVERTKIT_API_URL = 'https://api.convertkit.com/v3'
    const FORM_ID = process.env.CONVERTKIT_FORM_ID
    const API_KEY = process.env.CONVERTKIT_API_KEY

    if (!FORM_ID || !API_KEY) {
      throw new Error('ConvertKit configuration missing')
    }

    const response = await fetch(
      `${CONVERTKIT_API_URL}/forms/${FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: API_KEY,
          email: email,
          tags: ['website-newsletter'],
        }),
      }
    )

    if (response.ok) {
      return {
        success: true,
        message: 'Successfully subscribed! Check your email for confirmation.',
      }
    } else {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Subscription failed')
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return {
      success: false,
      message: 'Failed to subscribe. Please try again later.',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
