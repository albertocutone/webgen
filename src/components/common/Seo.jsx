import { useEffect } from 'react'
import { useLocale } from '../../hooks/useLocale.js'
import { buildMeta, canonicalUrl } from '../../lib/seo.js'

function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    document.head.appendChild(el)
  }
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value)
  return el
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Keeps the document head in step with the active route and locale.
 *
 * Prerendering (scripts/prerender.mjs) writes the same values into the static
 * HTML, so crawlers see them without running JS; this component only matters
 * for client-side navigation afterwards.
 */
export default function Seo({ routeId, path }) {
  const { locale } = useLocale()

  useEffect(() => {
    const { title, description } = buildMeta(routeId, locale)

    document.title = title
    upsertMeta('meta[name="description"]', { name: 'description', content: description })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl(path) })
    upsertMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    })
    upsertLink('canonical', canonicalUrl(path))
  }, [routeId, path, locale])

  return null
}
