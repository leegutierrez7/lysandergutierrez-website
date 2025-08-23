'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    this.setState({
      error,
      errorInfo,
    })

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // In production, you might want to log to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } })
      console.error('Production error logged:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent:
          typeof window !== 'undefined'
            ? window.navigator.userAgent
            : 'unknown',
        url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      })
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  private handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
          <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg dark:bg-gray-800">
            {/* Error Icon */}
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
                <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
            </div>

            {/* Error Title */}
            <h1 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Oops! Something went wrong
            </h1>

            {/* Error Message */}
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              We apologize for the inconvenience. An unexpected error occurred
              while loading this page.
            </p>

            {/* Error Details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 rounded-lg bg-gray-100 p-4 text-left dark:bg-gray-700">
                <h3 className="mb-2 font-medium text-gray-900 dark:text-white">
                  Error Details:
                </h3>
                <pre className="overflow-auto text-sm text-red-600 dark:text-red-400">
                  {this.state.error.message}
                </pre>
                {this.state.errorInfo && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                      Component Stack
                    </summary>
                    <pre className="mt-1 overflow-auto text-xs text-gray-600 dark:text-gray-400">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </button>

              <button
                onClick={this.handleReload}
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reload Page
              </button>
            </div>

            {/* Navigation Links */}
            <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-600">
              <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                Or navigate to:
              </p>
              <div className="flex flex-col justify-center gap-2 sm:flex-row">
                <a
                  href="/"
                  className="inline-flex items-center justify-center px-3 py-1 text-sm text-blue-600 transition-colors duration-200 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Home className="mr-1 h-4 w-4" />
                  Home
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-3 py-1 text-sm text-blue-600 transition-colors duration-200 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Mail className="mr-1 h-4 w-4" />
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
