'use client'

import { useEffect, useState } from 'react'
import {
  BarChart3,
  Users,
  Clock,
  TrendingUp,
  Eye,
  Mouse,
  Scroll,
  Globe,
} from 'lucide-react'

interface AnalyticsData {
  pageViews: {
    total: number
    unique: number
    pages: { path: string; views: number }[]
  }
  userMetrics: {
    totalUsers: number
    newUsers: number
    returningUsers: number
    avgSessionDuration: number
    bounceRate: number
  }
  performanceMetrics: {
    avgLoadTime: number
    avgFCP: number
    avgLCP: number
    avgCLS: number
    mobileScore: number
    desktopScore: number
  }
  engagement: {
    avgTimeOnPage: number
    scrollDepth: number
    clickThroughRate: number
    interactions: { type: string; count: number }[]
  }
  demographics: {
    countries: { country: string; users: number }[]
    devices: { device: string; percentage: number }[]
    browsers: { browser: string; percentage: number }[]
  }
  realTime: {
    activeUsers: number
    currentPages: { path: string; users: number }[]
    recentEvents: { event: string; timestamp: Date; details: string }[]
  }
}

interface AnalyticsDashboardProps {
  isVisible: boolean
  onClose: () => void
}

export default function AnalyticsDashboard({
  isVisible,
  onClose,
}: AnalyticsDashboardProps) {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('7d')

  useEffect(() => {
    if (isVisible) {
      loadAnalyticsData()
      // Set up real-time updates
      const interval = setInterval(loadAnalyticsData, 30000) // Update every 30 seconds
      return () => clearInterval(interval)
    }
  }, [isVisible, timeRange])

  const loadAnalyticsData = async () => {
    try {
      setLoading(true)

      // Simulate analytics data (in production, this would fetch from your analytics API)
      const mockData: AnalyticsData = {
        pageViews: {
          total: 15420,
          unique: 12350,
          pages: [
            { path: '/', views: 8500 },
            { path: '/projects', views: 3200 },
            { path: '/blog', views: 2100 },
            { path: '/about', views: 1200 },
            { path: '/contact', views: 420 },
          ],
        },
        userMetrics: {
          totalUsers: 12350,
          newUsers: 8900,
          returningUsers: 3450,
          avgSessionDuration: 245, // seconds
          bounceRate: 32.5, // percentage
        },
        performanceMetrics: {
          avgLoadTime: 1.2,
          avgFCP: 1100,
          avgLCP: 2200,
          avgCLS: 0.05,
          mobileScore: 92,
          desktopScore: 98,
        },
        engagement: {
          avgTimeOnPage: 180,
          scrollDepth: 65,
          clickThroughRate: 3.2,
          interactions: [
            { type: 'Project View', count: 1250 },
            { type: 'Contact Form', count: 85 },
            { type: 'Blog Read', count: 620 },
            { type: 'Resume Download', count: 340 },
          ],
        },
        demographics: {
          countries: [
            { country: 'United States', users: 6200 },
            { country: 'United Kingdom', users: 1800 },
            { country: 'Canada', users: 1200 },
            { country: 'Germany', users: 900 },
            { country: 'Australia', users: 650 },
          ],
          devices: [
            { device: 'Desktop', percentage: 55 },
            { device: 'Mobile', percentage: 38 },
            { device: 'Tablet', percentage: 7 },
          ],
          browsers: [
            { browser: 'Chrome', percentage: 68 },
            { browser: 'Safari', percentage: 18 },
            { browser: 'Firefox', percentage: 8 },
            { browser: 'Edge', percentage: 6 },
          ],
        },
        realTime: {
          activeUsers: 23,
          currentPages: [
            { path: '/', users: 12 },
            { path: '/projects', users: 7 },
            {
              path: '/blog/building-modern-web-applications-nextjs-15',
              users: 3,
            },
            { path: '/contact', users: 1 },
          ],
          recentEvents: [
            {
              event: 'Page View',
              timestamp: new Date(Date.now() - 30000),
              details: '/projects',
            },
            {
              event: 'Contact Form',
              timestamp: new Date(Date.now() - 120000),
              details: 'Form submission',
            },
            {
              event: 'Resume Download',
              timestamp: new Date(Date.now() - 180000),
              details: 'PDF download',
            },
          ],
        },
      }

      setData(mockData)
    } catch (error) {
      console.error('Error loading analytics data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="min-h-screen p-4">
        <div className="mx-auto max-w-7xl rounded-lg bg-white shadow-xl dark:bg-gray-900">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Analytics Dashboard
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              {/* Time Range Selector */}
              <select
                value={timeRange}
                onChange={e =>
                  setTimeRange(e.target.value as '24h' | '7d' | '30d' | '90d')
                }
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <button
                onClick={onClose}
                className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-12">
              <div className="text-center">
                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                <p className="text-gray-600 dark:text-gray-400">
                  Loading analytics data...
                </p>
              </div>
            </div>
          ) : data ? (
            <div className="space-y-8 p-6">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
                  <div className="flex items-center space-x-3">
                    <Eye className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Total Views
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatNumber(data.pageViews.total)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
                  <div className="flex items-center space-x-3">
                    <Users className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Total Users
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatNumber(data.userMetrics.totalUsers)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-purple-50 p-6 dark:bg-purple-900/20">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Avg Session
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatDuration(data.userMetrics.avgSessionDuration)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-orange-50 p-6 dark:bg-orange-900/20">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Bounce Rate
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {data.userMetrics.bounceRate}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-time Section */}
              <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
                <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                  <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                  Real-time ({data.realTime.activeUsers} active users)
                </h3>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-medium text-gray-700 dark:text-gray-300">
                      Active Pages
                    </h4>
                    <div className="space-y-2">
                      {data.realTime.currentPages.map((page, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="truncate text-sm text-gray-600 dark:text-gray-400">
                            {page.path}
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {page.users} users
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-3 font-medium text-gray-700 dark:text-gray-300">
                      Recent Activity
                    </h4>
                    <div className="space-y-2">
                      {data.realTime.recentEvents.map((event, index) => (
                        <div key={index} className="text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-900 dark:text-white">
                              {event.event}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400">
                              {Math.floor(
                                (Date.now() - event.timestamp.getTime()) / 60000
                              )}
                              m ago
                            </span>
                          </div>
                          <div className="text-gray-600 dark:text-gray-400">
                            {event.details}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Performance Metrics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Avg Load Time
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {data.performanceMetrics.avgLoadTime}s
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        First Contentful Paint
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {data.performanceMetrics.avgFCP}ms
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Mobile Score
                      </span>
                      <span className="font-medium text-green-600">
                        {data.performanceMetrics.mobileScore}/100
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Desktop Score
                      </span>
                      <span className="font-medium text-green-600">
                        {data.performanceMetrics.desktopScore}/100
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    User Engagement
                  </h3>
                  <div className="space-y-4">
                    {data.engagement.interactions.map((interaction, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-600 dark:text-gray-400">
                          {interaction.type}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formatNumber(interaction.count)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Pages */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Top Pages
                </h3>
                <div className="space-y-3">
                  {data.pageViews.pages.map((page, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
                        {page.path}
                      </span>
                      <div className="flex items-center space-x-3">
                        <div className="h-2 w-24 rounded-full bg-gray-200 dark:bg-gray-700">
                          <div
                            className="h-2 rounded-full bg-blue-600"
                            style={{
                              width: `${(page.views / data.pageViews.pages[0].views) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="w-16 text-right font-medium text-gray-900 dark:text-white">
                          {formatNumber(page.views)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center p-12">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Failed to load analytics data
                </p>
                <button
                  onClick={loadAnalyticsData}
                  className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
