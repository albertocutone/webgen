import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const STORAGE_KEY = 'mm.cookieConsent'

/** 'accepted' | 'declined' | null (no decision yet) */
function readStored() {
  if (typeof window === 'undefined') return null
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value === 'accepted' || value === 'declined' ? value : null
  } catch {
    // Safari private mode throws; treat as "no decision recorded".
    return null
  }
}

const CookieConsentContext = createContext(null)

export function CookieConsentProvider({ children }) {
  const [consent, setConsent] = useState(readStored)

  const decide = useCallback((decision) => {
    setConsent(decision)
    try {
      window.localStorage.setItem(STORAGE_KEY, decision)
    } catch {
      // Best-effort: the choice still applies for this session.
    }
  }, [])

  const value = useMemo(
    () => ({
      consent,
      // The banner shows only until a decision exists. Under GDPR silence is
      // not consent, so the default is "declined" in behaviour: nothing
      // non-essential may run while consent is null.
      needsDecision: consent === null,
      analyticsAllowed: consent === 'accepted',
      accept: () => decide('accepted'),
      decline: () => decide('declined'),
    }),
    [consent, decide],
  )

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext)
  if (!ctx) throw new Error('useCookieConsent must be used inside a <CookieConsentProvider>')
  return ctx
}
