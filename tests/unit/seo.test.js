import { buildMeta, canonicalUrl, buildJsonLd, clamp } from '../../src/lib/seo.js'
import { ROUTES } from '../../src/routes.js'

describe('buildMeta', () => {
  it('leads with the venue name on the home page', () => {
    expect(buildMeta('home', 'it').title).toMatch(/^Masseria Mastrangelo/)
  })

  it('leads with the page title elsewhere, so results are distinguishable', () => {
    expect(buildMeta('appartamenti', 'it').title).toMatch(/^Appartamenti/)
    expect(buildMeta('appartamenti', 'it').title).toContain('Masseria Mastrangelo')
  })

  it('translates with the locale', () => {
    expect(buildMeta('appartamenti', 'en').title).toMatch(/^Apartments/)
  })

  it.each(ROUTES.map((r) => [r.id]))('produces usable metadata for %s', (id) => {
    for (const locale of ['it', 'en']) {
      const { title, description } = buildMeta(id, locale)
      expect(title.length).toBeGreaterThan(0)
      expect(title.length).toBeLessThanOrEqual(60)
      expect(description.length).toBeGreaterThan(0)
      expect(description.length).toBeLessThanOrEqual(160)
    }
  })

  it('gives every route a distinct title', () => {
    const titles = ROUTES.map((r) => buildMeta(r.id, 'it').title)
    expect(new Set(titles).size).toBe(titles.length)
  })

  it('falls back gracefully for an unknown route id', () => {
    const meta = buildMeta('nope', 'it')
    expect(meta.title).toBe('Masseria Mastrangelo')
    expect(meta.description).toBeTruthy()
  })
})

describe('canonicalUrl', () => {
  it('keeps a trailing slash for the root only', () => {
    expect(canonicalUrl('/', 'https://example.com')).toBe('https://example.com/')
    expect(canonicalUrl('/contatti', 'https://example.com')).toBe('https://example.com/contatti')
  })

  it('tolerates a site url with a trailing slash', () => {
    expect(canonicalUrl('/contatti', 'https://example.com/')).toBe('https://example.com/contatti')
  })
})

describe('buildJsonLd', () => {
  it('describes the venue as a LodgingBusiness', () => {
    const ld = buildJsonLd('it', 'https://example.com')
    expect(ld['@type']).toBe('LodgingBusiness')
    expect(ld.name).toBe('Masseria Mastrangelo')
    expect(ld.url).toBe('https://example.com/')
    expect(ld.address.addressCountry).toBe('IT')
    expect(ld.petsAllowed).toBe(true)
  })

  it('serialises to valid JSON for the script tag', () => {
    expect(() => JSON.parse(JSON.stringify(buildJsonLd('en')))).not.toThrow()
  })
})

describe('clamp', () => {
  it('leaves short text untouched', () => {
    expect(clamp('breve', 60)).toBe('breve')
  })

  it('cuts on a word boundary and marks the elision', () => {
    const result = clamp('alpha beta gamma delta epsilon', 20)
    expect(result.length).toBeLessThanOrEqual(20)
    expect(result.endsWith('…')).toBe(true)
    // No half-words: everything before the ellipsis is a whole word.
    expect(result.slice(0, -1).trim().split(' ').pop()).toMatch(/^(alpha|beta|gamma|delta)$/)
  })
})
