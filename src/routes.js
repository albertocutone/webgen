/**
 * Single source of truth for the site's routes.
 *
 * Paths are Italian in both locales — no /en/ or /it/ prefix. The venue's
 * search intent is overwhelmingly Italian, one canonical URL per page avoids
 * duplicate-content penalties, and a locale prefix would need server-side
 * redirects that GitHub Pages cannot provide. The EN/IT toggle swaps copy,
 * not URLs.
 *
 * `navKey` indexes into content `nav.*`; entries without one (privacy, 404)
 * stay out of the header.
 */
export const ROUTES = [
  { path: '/', id: 'home', navKey: 'home', inNav: true, inSitemap: true },
  { path: '/chi-siamo', id: 'chiSiamo', navKey: 'chiSiamo', inNav: true, inSitemap: true },
  {
    path: '/appartamenti',
    id: 'appartamenti',
    navKey: 'appartamenti',
    inNav: true,
    inSitemap: true,
  },
  { path: '/territorio', id: 'territorio', navKey: 'territorio', inNav: true, inSitemap: true },
  { path: '/pet-friendly', id: 'petFriendly', navKey: 'petFriendly', inNav: true, inSitemap: true },
  { path: '/esperienze', id: 'esperienze', navKey: 'esperienze', inNav: true, inSitemap: true },
  {
    path: '/come-raggiungerci',
    id: 'comeRaggiungerci',
    navKey: 'comeRaggiungerci',
    inNav: true,
    inSitemap: true,
  },
  { path: '/contatti', id: 'contatti', navKey: 'contatti', inNav: true, inSitemap: true },
  { path: '/privacy', id: 'privacy', navKey: null, inNav: false, inSitemap: true },
]

/** Header links, in display order. */
export const NAV_ROUTES = ROUTES.filter((r) => r.inNav)

/** Routes that belong in sitemap.xml. */
export const SITEMAP_ROUTES = ROUTES.filter((r) => r.inSitemap)

/** The conversion target every CTA points at (design section 5.2). */
export const BOOKING_PATH = '/contatti'
