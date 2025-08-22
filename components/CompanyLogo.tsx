import React from 'react'
import Image from 'next/image'

interface CompanyLogoProps {
    src: string
    alt: string
    size?: number // square side in px
    accentFrom?: string
    accentTo?: string
    priority?: boolean
    variant?: 'decorated' | 'minimal'
    className?: string
}

export default function CompanyLogo({
    src,
    alt,
    size = 80,
    accentFrom = '#3b82f6',
    accentTo = '#8b5cf6',
    priority,
    variant = 'decorated',
    className = ''
}: CompanyLogoProps) {
    const dimension = `${size}px`

    if (variant === 'minimal') {
        return (
            <div
                className={`relative inline-flex items-center justify-center shrink-0 rounded-md bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-700 overflow-hidden ${className}`}
                style={{ width: dimension, height: dimension }}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes={`${size}px`}
                    priority={priority}
                    className="object-contain p-1.5"
                />
            </div>
        )
    }

    return (
        <div
            className={`relative group/logo inline-flex items-center justify-center shrink-0 ${className}`}
            style={{ width: dimension, height: dimension }}
        >
            <div
                aria-hidden
                className="absolute inset-0 rounded-full opacity-0 group-hover/logo:opacity-100 blur-md transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 30% 30%, ${accentFrom}55, transparent 70%)` }}
            />
            <div
                aria-hidden
                className="absolute inset-0 rounded-full border border-white/40 dark:border-white/10 bg-gradient-to-br shadow-sm"
                style={{ backgroundImage: `linear-gradient(135deg, ${accentFrom}15, ${accentTo}15)` }}
            />
            <div className="absolute inset-[6%] rounded-full bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 overflow-hidden" />
            <Image
                src={src}
                alt={alt}
                fill
                sizes={`${size}px`}
                priority={priority}
                className="object-contain p-1 select-none"
            />
        </div>
    )
}
