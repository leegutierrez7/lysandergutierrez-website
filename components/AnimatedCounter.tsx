'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
    end: number
    duration?: number
    suffix?: string
    prefix?: string
    announceFinalOnly?: boolean // if true, only announce final value for screen readers
}

export default function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '', announceFinalOnly = true }: AnimatedCounterProps) {
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLSpanElement>(null)
    const finalValueRef = useRef(end)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [isVisible])

    useEffect(() => {
        if (!isVisible) return

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReducedMotion) {
            setCount(end)
            return
        }

        let startTime: number

        const updateCount = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeOutCubic = 1 - Math.pow(1 - progress, 3)
            const nextVal = Math.floor(easeOutCubic * end)
            setCount(nextVal)
            if (progress < 1) requestAnimationFrame(updateCount)
        }
        requestAnimationFrame(updateCount)
    }, [isVisible, end, duration])

    return (
        <span
            ref={ref}
            className="font-bold text-2xl"
            aria-label={announceFinalOnly ? `${prefix}${finalValueRef.current}${suffix}` : undefined}
            aria-live={announceFinalOnly ? 'off' : 'polite'}
            role="text"
        >
            {prefix}{count}{suffix}
        </span>
    )
}
