import { useContext } from 'react'
import { LocaleContext } from '../i18n/LocaleContext.jsx'

/** Access the active locale, the setter, and the resolved copy bundle (`t`). */
export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    throw new Error('useLocale must be used inside a <LocaleProvider>')
  }
  return ctx
}
