// Writes dist/sitemap.xml and dist/robots.txt from the app's own route table,
// so a new page in src/routes.js is indexed without a second edit.
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { SITEMAP_ROUTES } from '../src/routes.js'
import { SITE_URL } from '../src/lib/constants.js'

const dist = resolve(process.cwd(), 'dist')
const siteUrl = (process.env.SITE_URL ?? SITE_URL).replace(/\/$/, '')
const lastmod = new Date().toISOString().slice(0, 10)

// The home page should rank above interior pages; /contatti matters because it
// is the conversion target.
function priorityFor(path) {
  if (path === '/') return '1.0'
  if (path === '/contatti' || path === '/appartamenti') return '0.9'
  if (path === '/privacy') return '0.3'
  return '0.7'
}

const urls = SITEMAP_ROUTES.map((route) => {
  const loc = route.path === '/' ? `${siteUrl}/` : `${siteUrl}${route.path}`
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <priority>${priorityFor(route.path)}</priority>`,
    '  </url>',
  ].join('\n')
}).join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

writeFileSync(resolve(dist, 'sitemap.xml'), sitemap)
writeFileSync(resolve(dist, 'robots.txt'), robots)
console.log(`sitemap: ${SITEMAP_ROUTES.length} urls, robots.txt written`)
