'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
    interface Window {
        gtag?: (command: string, targetId: string, config?: any) => void
    }
}

interface AnalyticsProps {
    GA_MEASUREMENT_ID?: string
}

export default function Analytics({ GA_MEASUREMENT_ID }: AnalyticsProps) {
    const pathname = usePathname()

    useEffect(() => {
        if (!GA_MEASUREMENT_ID) return

        // Track page views
        window.gtag?.('config', GA_MEASUREMENT_ID, {
            page_path: pathname,
            custom_map: {
                dimension1: 'page_type',
            },
        })

        // Track performance metrics
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'navigation') {
                    const navigationEntry = entry as PerformanceNavigationTiming

                    // Track Core Web Vitals
                    window.gtag?.('event', 'page_timing', {
                        event_category: 'Performance',
                        event_label: pathname,
                        page_load_time: Math.round(navigationEntry.loadEventEnd - navigationEntry.loadEventStart),
                        dom_content_loaded: Math.round(navigationEntry.domContentLoadedEventEnd - navigationEntry.domContentLoadedEventStart),
                        first_paint: Math.round(navigationEntry.loadEventEnd - navigationEntry.fetchStart),
                    })
                }

                if (entry.entryType === 'paint') {
                    const paintEntry = entry as PerformancePaintTiming
                    window.gtag?.('event', 'paint_timing', {
                        event_category: 'Performance',
                        event_label: paintEntry.name,
                        value: Math.round(paintEntry.startTime),
                    })
                }
            }
        })

        observer.observe({ entryTypes: ['navigation', 'paint'] })

        return () => {
            observer.disconnect()
        }
    }, [pathname, GA_MEASUREMENT_ID])

    useEffect(() => {
        if (!GA_MEASUREMENT_ID) return

        // Track user interactions
        const trackClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            const link = target.closest('a')

            if (link) {
                const href = link.href
                const isExternal = !href.startsWith(window.location.origin)

                window.gtag?.('event', 'click', {
                    event_category: isExternal ? 'External Link' : 'Internal Link',
                    event_label: href,
                    transport_type: 'beacon',
                })
            }
        }

        const trackScroll = () => {
            const scrollPercentage = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            )

            if (scrollPercentage > 0 && scrollPercentage % 25 === 0) {
                window.gtag?.('event', 'scroll', {
                    event_category: 'Engagement',
                    event_label: `${scrollPercentage}%`,
                    value: scrollPercentage,
                })
            }
        }

        document.addEventListener('click', trackClick)
        window.addEventListener('scroll', trackScroll, { passive: true })

        return () => {
            document.removeEventListener('click', trackClick)
            window.removeEventListener('scroll', trackScroll)
        }
    }, [GA_MEASUREMENT_ID])

    // Don't render anything in development
    if (process.env.NODE_ENV === 'development') {
        return null
    }

    if (!GA_MEASUREMENT_ID) {
        return null
    }

    return (
        <>
            <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          `,
                }}
            />
        </>
    )
}
