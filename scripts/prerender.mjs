/**
 * Prerenders every route to static HTML (design §7).
 *
 * A client-rendered SPA ships an empty <div id="root">. Google executes JS but
 * many crawlers and social scrapers do not, so the site's entire purpose —
 * being found — would depend on that. This writes real HTML per route.
 *
 * The browser still boots the SPA with createRoot rather than hydrateRoot: the
 * locale comes from localStorage/navigator and the cookie banner from stored
 * consent, neither of which the build can know, so hydration would mismatch on
 * a returning visitor. The prerendered markup exists for crawlers and first
 * paint; React replaces it with an identical tree on load.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROUTES } from '../src/routes.js'
import { buildMeta, canonicalUrl, buildJsonLd } from '../src/lib/seo.js'

const dist = resolve(process.cwd(), 'dist')
const template = readFileSync(resolve(dist, 'index.html'), 'utf8')

const { render } = await import(pathToFileURL(resolve(process.cwd(), 'dist-ssr/entry-server.js')))

const LOCALE = 'it'
const jsonLd = JSON.stringify(buildJsonLd(LOCALE))

function escapeAttr(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

function headFor(routeId, path) {
  const { title, description } = buildMeta(routeId, LOCALE)
  const url = canonicalUrl(path)
  return [
    `<title>${escapeAttr(title)}</title>`,
    `<meta name="description" content="${escapeAttr(description)}">`,
    `<link rel="canonical" href="${escapeAttr(url)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:title" content="${escapeAttr(title)}">`,
    `<meta property="og:description" content="${escapeAttr(description)}">`,
    `<meta property="og:url" content="${escapeAttr(url)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join('\n    ')
}

let count = 0
for (const route of ROUTES) {
  const appHtml = render(route.path)

  const html = template
    // Replace the placeholder title and description from index.html rather
    // than appending duplicates.
    .replace(/<title>.*?<\/title>/s, '__HEAD__')
    .replace(/\s*<meta name="description"[^>]*>/s, '')
    .replace('__HEAD__', headFor(route.id, route.path))
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

  const outFile =
    route.path === '/'
      ? resolve(dist, 'index.html')
      : resolve(dist, `${route.path.replace(/^\//, '')}/index.html`)

  mkdirSync(dirname(outFile), { recursive: true })
  writeFileSync(outFile, html)
  count += 1
}

console.log(`prerender: ${count} routes written`)
