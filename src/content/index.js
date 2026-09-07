import it from './it/site.js'
import en from './en/site.js'

export const DEFAULT_LOCALE = 'it'
export const LOCALES = ['it', 'en']

const CONTENT = { it, en }

/** Returns the content bundle for a locale, falling back to Italian. */
export function getContent(locale) {
  return CONTENT[locale] ?? CONTENT[DEFAULT_LOCALE]
}

export function isSupportedLocale(locale) {
  return LOCALES.includes(locale)
}
