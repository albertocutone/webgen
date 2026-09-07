import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { DEFAULT_LOCALE, getContent, isSupportedLocale } from '../content/index.js'

const STORAGE_KEY = 'mm.locale'

export const LocaleContext = createContext(null)

/**
 * Resolves the initial locale: an explicit past choice wins, otherwise the
 * browser's preference, otherwise Italian. Reading localStorage is wrapped
 * because Safari private mode throws on access.
 */
function detectLocale() {
  if (typeof window === 'undefined') return DEFAULT_LOCALE

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isSupportedLocale(stored)) return stored
  } catch {
    // localStorage unavailable — fall through to browser preference
  }

  const browser = window.navigator?.language?.slice(0, 2)
  return isSupportedLocale(browser) ? browser : DEFAULT_LOCALE
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(detectLocale)

  const setLocale = useCallback((next) => {
    if (!isSupportedLocale(next)) return
    setLocaleState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Persisting is best-effort; the choice still applies for this session.
    }
  }, [])

  // Keep <html lang> in sync so screen readers and search engines agree with
  // the visible copy.
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo(() => ({ locale, setLocale, t: getContent(locale) }), [locale, setLocale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
