'use client'

import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  fcp?: number // First Contentful Paint
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay
  cls?: number // Cumulative Layout Shift
  ttfb?: number // Time to First Byte

  // Enhanced metrics
  domContentLoaded?: number
  loadComplete?: number
  memoryUsage?: number
  connectionType?: string
  deviceType?: 'mobile' | 'tablet' | 'desktop'

  // Bundle metrics
  bundleSize?: number
  resourceCount?: number

  // User experience metrics
  timeOnPage?: number
  scrollDepth?: number
  interactionCount?: number
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({})

  useEffect(() => {
    if (typeof window === 'undefined') return

    const observePerformance = () => {
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          switch (entry.entryType) {
            case 'paint':
              const paintEntry = entry as PerformancePaintTiming
              if (paintEntry.name === 'first-contentful-paint') {
                setMetrics(prev => ({ ...prev, fcp: paintEntry.startTime }))
              }
              break

            case 'largest-contentful-paint':
              const lcpEntry = entry as any
              setMetrics(prev => ({ ...prev, lcp: lcpEntry.startTime }))
              break

            case 'first-input':
              const fidEntry = entry as any
              setMetrics(prev => ({
                ...prev,
                fid: fidEntry.processingStart - fidEntry.startTime,
              }))
              break

            case 'layout-shift':
              const clsEntry = entry as any
              if (!clsEntry.hadRecentInput) {
                setMetrics(prev => ({
                  ...prev,
                  cls: (prev.cls || 0) + clsEntry.value,
                }))
              }
              break

            case 'navigation':
              const navEntry = entry as PerformanceNavigationTiming
              setMetrics(prev => ({
                ...prev,
                ttfb: navEntry.responseStart - navEntry.requestStart,
              }))
              break
          }
        }
      })

      // Observe different entry types
      try {
        observer.observe({ type: 'paint', buffered: true })
        observer.observe({ type: 'largest-contentful-paint', buffered: true })
        observer.observe({ type: 'first-input', buffered: true })
        observer.observe({ type: 'layout-shift', buffered: true })
        observer.observe({ type: 'navigation', buffered: true })
      } catch (e) {
        console.warn('Performance Observer not fully supported:', e)
      }

      return () => {
        observer.disconnect()
      }
    }

    const cleanup = observePerformance()

    // Also check for Web Vitals using the web-vitals library pattern
    const getCLS = (callback: (value: number) => void) => {
      let clsValue = 0
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
            callback(clsValue)
          }
        }
      })
      observer.observe({ type: 'layout-shift', buffered: true })
    }

    const getFID = (callback: (value: number) => void) => {
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries() as any[]) {
          callback(entry.processingStart - entry.startTime)
        }
      })
      observer.observe({ type: 'first-input', buffered: true })
    }

    const getLCP = (callback: (value: number) => void) => {
      const observer = new PerformanceObserver(list => {
        const entries = list.getEntries() as any[]
        const lastEntry = entries[entries.length - 1]
        callback(lastEntry.startTime)
      })
      observer.observe({ type: 'largest-contentful-paint', buffered: true })
    }

    // Set up the observers
    getCLS(value => setMetrics(prev => ({ ...prev, cls: value })))
    getFID(value => setMetrics(prev => ({ ...prev, fid: value })))
    getLCP(value => setMetrics(prev => ({ ...prev, lcp: value })))

    return cleanup
  }, [])

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const getScoreColor = (metric: string, value: number) => {
    switch (metric) {
      case 'fcp':
        return value <= 1800
          ? 'text-green-600'
          : value <= 3000
            ? 'text-yellow-600'
            : 'text-red-600'
      case 'lcp':
        return value <= 2500
          ? 'text-green-600'
          : value <= 4000
            ? 'text-yellow-600'
            : 'text-red-600'
      case 'fid':
        return value <= 100
          ? 'text-green-600'
          : value <= 300
            ? 'text-yellow-600'
            : 'text-red-600'
      case 'cls':
        return value <= 0.1
          ? 'text-green-600'
          : value <= 0.25
            ? 'text-yellow-600'
            : 'text-red-600'
      case 'ttfb':
        return value <= 600
          ? 'text-green-600'
          : value <= 1000
            ? 'text-yellow-600'
            : 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-black/90 p-3 font-mono text-xs text-white shadow-lg">
      <div className="mb-2 font-semibold">Performance Metrics</div>
      <div className="space-y-1">
        {metrics.fcp && (
          <div
            className={`flex justify-between gap-4 ${getScoreColor('fcp', metrics.fcp)}`}
          >
            <span>FCP:</span>
            <span>{Math.round(metrics.fcp)}ms</span>
          </div>
        )}
        {metrics.lcp && (
          <div
            className={`flex justify-between gap-4 ${getScoreColor('lcp', metrics.lcp)}`}
          >
            <span>LCP:</span>
            <span>{Math.round(metrics.lcp)}ms</span>
          </div>
        )}
        {metrics.fid && (
          <div
            className={`flex justify-between gap-4 ${getScoreColor('fid', metrics.fid)}`}
          >
            <span>FID:</span>
            <span>{Math.round(metrics.fid)}ms</span>
          </div>
        )}
        {metrics.cls !== undefined && (
          <div
            className={`flex justify-between gap-4 ${getScoreColor('cls', metrics.cls)}`}
          >
            <span>CLS:</span>
            <span>{metrics.cls.toFixed(3)}</span>
          </div>
        )}
        {metrics.ttfb && (
          <div
            className={`flex justify-between gap-4 ${getScoreColor('ttfb', metrics.ttfb)}`}
          >
            <span>TTFB:</span>
            <span>{Math.round(metrics.ttfb)}ms</span>
          </div>
        )}
      </div>
      <div className="mt-2 border-t border-gray-600 pt-2 text-gray-400">
        <div className="text-[10px]">
          <span className="text-green-400">●</span> Good
          <span className="ml-2 text-yellow-400">●</span> Needs Improvement
          <span className="ml-2 text-red-400">●</span> Poor
        </div>
      </div>
    </div>
  )
}
