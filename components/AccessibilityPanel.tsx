'use client'

import { useState, useEffect } from 'react'
import {
  Accessibility,
  Eye,
  EyeOff,
  Type,
  Contrast,
  Volume2,
  Mouse,
  Keyboard,
} from 'lucide-react'

interface AccessibilityState {
  reducedMotion: boolean
  highContrast: boolean
  largeText: boolean
  screenReader: boolean
  keyboardNavigation: boolean
  focusOutlines: boolean
}

interface AccessibilityPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function AccessibilityPanel({
  isOpen,
  onClose,
}: AccessibilityPanelProps) {
  const [settings, setSettings] = useState<AccessibilityState>({
    reducedMotion: false,
    highContrast: false,
    largeText: false,
    screenReader: false,
    keyboardNavigation: true,
    focusOutlines: true,
  })

  // Load saved accessibility settings
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility-settings')
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings(parsed)
        applySettings(parsed)
      } catch (error) {
        console.error('Error parsing accessibility settings:', error)
      }
    }

    // Check system preferences
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const prefersHighContrast = window.matchMedia(
      '(prefers-contrast: high)'
    ).matches

    if (prefersReducedMotion || prefersHighContrast) {
      const systemSettings = {
        ...settings,
        reducedMotion: prefersReducedMotion,
        highContrast: prefersHighContrast,
      }
      setSettings(systemSettings)
      applySettings(systemSettings)
    }
  }, [])

  // Apply accessibility settings to the document
  const applySettings = (newSettings: AccessibilityState) => {
    const root = document.documentElement

    // Reduced motion
    if (newSettings.reducedMotion) {
      root.style.setProperty('--animation-duration', '0.01ms')
      root.classList.add('reduce-motion')
    } else {
      root.style.removeProperty('--animation-duration')
      root.classList.remove('reduce-motion')
    }

    // High contrast
    if (newSettings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Large text
    if (newSettings.largeText) {
      root.classList.add('large-text')
    } else {
      root.classList.remove('large-text')
    }

    // Focus outlines
    if (newSettings.focusOutlines) {
      root.classList.add('enhanced-focus')
    } else {
      root.classList.remove('enhanced-focus')
    }

    // Screen reader optimizations
    if (newSettings.screenReader) {
      root.classList.add('screen-reader-optimized')
    } else {
      root.classList.remove('screen-reader-optimized')
    }
  }

  // Update a specific setting
  const updateSetting = (key: keyof AccessibilityState, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    applySettings(newSettings)

    // Save to localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(newSettings))

    // Announce change to screen readers
    announceChange(key, value)
  }

  // Announce changes to screen readers
  const announceChange = (
    setting: keyof AccessibilityState,
    enabled: boolean
  ) => {
    const settingNames: Record<keyof AccessibilityState, string> = {
      reducedMotion: 'Reduced motion',
      highContrast: 'High contrast',
      largeText: 'Large text',
      screenReader: 'Screen reader optimization',
      keyboardNavigation: 'Keyboard navigation',
      focusOutlines: 'Focus outlines',
    }

    const message = `${settingNames[setting]} ${enabled ? 'enabled' : 'disabled'}`

    // Create temporary announcement element
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message

    document.body.appendChild(announcement)

    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  // Reset all settings
  const resetSettings = () => {
    const defaultSettings: AccessibilityState = {
      reducedMotion: false,
      highContrast: false,
      largeText: false,
      screenReader: false,
      keyboardNavigation: true,
      focusOutlines: true,
    }

    setSettings(defaultSettings)
    applySettings(defaultSettings)
    localStorage.removeItem('accessibility-settings')
    announceChange('reducedMotion', false) // Generic announcement for reset
  }

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const SettingToggle = ({
    setting,
    label,
    description,
    icon: Icon,
  }: {
    setting: keyof AccessibilityState
    label: string
    description: string
    icon: React.ComponentType<{ className?: string }>
  }) => (
    <div className="flex items-start space-x-3 rounded-lg p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
      <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <label className="cursor-pointer text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </label>
          <button
            role="switch"
            aria-checked={settings[setting]}
            aria-describedby={`${setting}-description`}
            onClick={() => updateSetting(setting, !settings[setting])}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              settings[setting] ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings[setting] ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <p
          id={`${setting}-description`}
          className="mt-1 text-xs text-gray-600 dark:text-gray-400"
        >
          {description}
        </p>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div
        className="max-h-[90vh] w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-900"
        role="dialog"
        aria-labelledby="accessibility-title"
        aria-describedby="accessibility-description"
      >
        {/* Header */}
        <div className="border-b border-gray-200 p-6 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Accessibility className="h-6 w-6 text-blue-600" />
              <h2
                id="accessibility-title"
                className="text-xl font-semibold text-gray-900 dark:text-white"
              >
                Accessibility Settings
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close accessibility panel"
              className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Eye className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <p
            id="accessibility-description"
            className="mt-2 text-sm text-gray-600 dark:text-gray-400"
          >
            Customize the site to better meet your accessibility needs.
          </p>
        </div>

        {/* Settings */}
        <div className="max-h-96 overflow-y-auto p-2">
          <div className="space-y-1">
            <SettingToggle
              setting="reducedMotion"
              label="Reduced Motion"
              description="Minimize animations and transitions"
              icon={Volume2}
            />

            <SettingToggle
              setting="highContrast"
              label="High Contrast"
              description="Increase color contrast for better visibility"
              icon={Contrast}
            />

            <SettingToggle
              setting="largeText"
              label="Large Text"
              description="Increase font size throughout the site"
              icon={Type}
            />

            <SettingToggle
              setting="focusOutlines"
              label="Enhanced Focus"
              description="Show clearer focus indicators for keyboard navigation"
              icon={Keyboard}
            />

            <SettingToggle
              setting="screenReader"
              label="Screen Reader Optimization"
              description="Optimize content structure for screen readers"
              icon={Volume2}
            />

            <SettingToggle
              setting="keyboardNavigation"
              label="Keyboard Navigation"
              description="Enable enhanced keyboard navigation support"
              icon={Mouse}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 dark:border-gray-700">
          <div className="flex flex-col justify-between gap-3 sm:flex-row">
            <button
              onClick={resetSettings}
              className="px-4 py-2 text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Reset to Defaults
            </button>
            <button
              onClick={onClose}
              className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Apply Settings
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
            Settings are saved automatically and persist across sessions.
          </p>
        </div>
      </div>
    </div>
  )
}

// Floating Accessibility Button
export function AccessibilityButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open accessibility settings"
        className="fixed bottom-4 left-4 z-40 rounded-full bg-blue-600 p-3 text-white shadow-lg transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Accessibility className="h-5 w-5" />
      </button>

      <AccessibilityPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
