'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

type Language = 'en' | 'es'

interface Translations {
  [key: string]: any
}

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string | number>) => string
  translations: Translations
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const [translations, setTranslations] = useState<Translations>({})

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${language}.json`)
        if (response.ok) {
          const data = await response.json()
          setTranslations(data)
        }
      } catch (error) {
        console.error('Error loading translations:', error)
        // Fallback to English if loading fails
        if (language !== 'en') {
          try {
            const fallbackResponse = await fetch('/locales/en.json')
            if (fallbackResponse.ok) {
              const fallbackData = await fallbackResponse.json()
              setTranslations(fallbackData)
            }
          } catch (fallbackError) {
            console.error('Error loading fallback translations:', fallbackError)
          }
        }
      }
    }

    loadTranslations()
  }, [language])

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && ['en', 'es'].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    } else {
      // Detect browser language
      const browserLanguage = navigator.language.split('-')[0] as Language
      if (['en', 'es'].includes(browserLanguage)) {
        setLanguage(browserLanguage)
      }
    }
  }, [])

  // Save language preference
  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  // Translation function with interpolation
  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.')
    let value: any = translations

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        console.warn(`Translation key not found: ${key}`)
        return key // Return the key if translation is not found
      }
    }

    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${key}`)
      return key
    }

    // Interpolate parameters
    if (params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match
      })
    }

    return value
  }

  const contextValue: I18nContextType = {
    language,
    setLanguage: changeLanguage,
    t,
    translations,
  }

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  )
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

// Language Switcher Component
export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n()

  return (
    <div className="flex items-center space-x-1">
      <button
        onClick={() => setLanguage('en')}
        className={`rounded px-2 py-1 text-sm transition-colors ${
          language === 'en'
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
            : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
        }`}
      >
        EN
      </button>
      <span className="text-gray-300 dark:text-gray-600">|</span>
      <button
        onClick={() => setLanguage('es')}
        className={`rounded px-2 py-1 text-sm transition-colors ${
          language === 'es'
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
            : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
        }`}
      >
        ES
      </button>
    </div>
  )
}
