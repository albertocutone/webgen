import { getContent } from '../content/index.js'
import { ADDRESS, CONTACT, SITE_URL } from './constants.js'

/** Google truncates around these lengths; longer text is wasted. */
const TITLE_MAX = 60
const DESCRIPTION_MAX = 160

export function clamp(text, max) {
  if (text.length <= max) return text
  // Cut on a word boundary rather than mid-word.
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, '')}…`
}

/**
 * Title and description for a route, derived from the page copy so there is
 * one place to edit rather than a parallel set of SEO strings that drift.
 *
 * The home page leads with the venue name; every other page leads with its own
 * title so search results are distinguishable at a glance.
 */
export function buildMeta(routeId, locale) {
  const t = getContent(locale)
  const page = t.pages[routeId]

  if (!page) {
    return { title: t.siteName, description: t.tagline }
  }

  const title =
    routeId === 'home' ? `${t.siteName} — ${t.tagline}` : `${page.title} — ${t.siteName}`

  return {
    title: clamp(title, TITLE_MAX),
    description: clamp(page.lead, DESCRIPTION_MAX),
  }
}

export function canonicalUrl(path, siteUrl = SITE_URL) {
  const base = siteUrl.replace(/\/$/, '')
  return path === '/' ? `${base}/` : `${base}${path}`
}

/**
 * schema.org LodgingBusiness. Helps search engines show the venue as a place
 * with an address and contact details rather than a generic web page.
 */
export function buildJsonLd(locale, siteUrl = SITE_URL) {
  const t = getContent(locale)
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: t.siteName,
    description: t.tagline,
    url: canonicalUrl('/', siteUrl),
    email: CONTACT.email,
    telephone: CONTACT.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.locality,
      addressRegion: ADDRESS.region,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.country,
    },
    petsAllowed: true,
  }
}
