'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, useAnimation, Variants } from 'framer-motion'

interface ScrollAnimationProps {
    children: React.ReactNode
    animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideInUp' | 'bounce' | 'rotate'
    delay?: number
    duration?: number
    threshold?: number
    className?: string
    once?: boolean
}

const animationVariants: Record<string, Variants> = {
    fadeInUp: {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    },
    fadeInLeft: {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 }
    },
    fadeInRight: {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 }
    },
    scaleIn: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 }
    },
    slideInUp: {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 }
    },
    bounce: {
        hidden: { opacity: 0, scale: 0.3 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 400, damping: 10 }
        }
    },
    rotate: {
        hidden: { opacity: 0, rotate: -180 },
        visible: { opacity: 1, rotate: 0 }
    }
}

export default function ScrollAnimation({
    children,
    animation = 'fadeInUp',
    delay = 0,
    duration = 0.6,
    threshold = 0.1,
    className = '',
    once = true
}: ScrollAnimationProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { amount: threshold, once })
    const controls = useAnimation()

    useEffect(() => {
        if (isInView) {
            controls.start('visible')
        } else if (!once) {
            controls.start('hidden')
        }
    }, [isInView, controls, once])

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={animationVariants[animation]}
            transition={{
                duration,
                delay: delay / 1000,
                ease: "easeOut"
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
