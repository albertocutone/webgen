import { screen, within } from '@testing-library/react'
import { renderApp } from './renderApp.jsx'
import itContent from '../../src/content/it/site.js'
import imageManifest from '../../src/generated/images.json'

beforeEach(() => {
  window.localStorage.clear()
  Object.defineProperty(window.navigator, 'language', { value: 'it-IT', configurable: true })
})

describe('Home hero', () => {
  it('carries the single h1', () => {
    renderApp('/')
    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveTextContent(itContent.pages.home.title)
  })

  it('loads the hero image eagerly, since it is the LCP element', () => {
    renderApp('/')
    const hero = screen.getByAltText(itContent.home.heroAlt)
    expect(hero).toHaveAttribute('loading', 'eager')
    expect(hero).toHaveAttribute('fetchpriority', 'high')
  })

  it('reserves the hero box using the real photo dimensions', () => {
    renderApp('/')
    const hero = screen.getByAltText(itContent.home.heroAlt)
    // Read from the manifest rather than hardcoding: swapping the photograph
    // changes the intrinsic size, and the point of the assertion is that
    // width/height are present and correct, not what they happen to be.
    const { width, height } = imageManifest.hero
    expect(hero).toHaveAttribute('width', String(width))
    expect(hero).toHaveAttribute('height', String(height))
  })

  it('serves the hero as responsive WebP, not the placeholder', () => {
    renderApp('/')
    const hero = screen.getByAltText(itContent.home.heroAlt)
    expect(hero.getAttribute('src')).toMatch(/hero-\d+\.webp$/)
    expect(hero.getAttribute('srcset')).toContain('hero-480.webp 480w')
  })

  it('offers both a booking and a browse route', () => {
    renderApp('/')
    expect(screen.getByRole('link', { name: itContent.home.heroCta })).toHaveAttribute(
      'href',
      '/contatti',
    )
    expect(screen.getByRole('link', { name: itContent.home.heroSecondary })).toHaveAttribute(
      'href',
      '/appartamenti',
    )
  })
})

describe('Appartamenti', () => {
  it('renders a card per unit', () => {
    renderApp('/appartamenti')
    for (const unit of itContent.apartments.items) {
      expect(screen.getByRole('heading', { name: unit.name, level: 3 })).toBeInTheDocument()
    }
  })

  it('lazy-loads unit images, which are below the fold', () => {
    renderApp('/appartamenti')
    for (const unit of itContent.apartments.items) {
      expect(screen.getByAltText(unit.name)).toHaveAttribute('loading', 'lazy')
    }
  })

  it('gives each enquire link a distinct accessible name', () => {
    renderApp('/appartamenti')
    const names = itContent.apartments.items.map(
      (u) => `${itContent.apartments.enquire} — ${u.name}`,
    )
    for (const name of names) {
      expect(screen.getByRole('link', { name })).toHaveAttribute('href', '/contatti')
    }
    expect(new Set(names).size).toBe(names.length)
  })

  it('lists the amenities confirmed for the property', () => {
    renderApp('/appartamenti')
    for (const amenity of itContent.apartments.amenities) {
      expect(screen.getByText(amenity)).toBeInTheDocument()
    }
  })

  it('advertises no amenity the property does not have', () => {
    // Google's listing is explicit: no pool, hot tub, gym or spa. Claiming any
    // of them would be a guest turning up to something that is not there.
    renderApp('/appartamenti')
    const page = document.body.textContent.toLowerCase()
    for (const absent of ['piscina', 'pool', 'spa', 'palestra', 'jacuzzi']) {
      // Word boundaries: "spa" is a substring of "spazio".
      expect(page).not.toMatch(new RegExp(`\\b${absent}\\b`))
    }
  })
})

describe('Esperienze (events)', () => {
  it('states plainly that it is not a walk-in restaurant', () => {
    renderApp('/esperienze')
    expect(screen.getByText(itContent.events.notRestaurant)).toBeInTheDocument()
  })

  it('lists the kinds of event hosted', () => {
    renderApp('/esperienze')
    for (const type of itContent.events.types) {
      expect(screen.getByText(type)).toBeInTheDocument()
    }
  })

  it('shows the venue photographs with descriptive alt text', () => {
    renderApp('/esperienze')
    for (const photo of itContent.events.photos) {
      const img = screen.getByAltText(photo.alt)
      expect(img.getAttribute('src')).toMatch(new RegExp(`${photo.id}-\\d+\\.webp$`))
    }
  })

  it('routes the event enquiry to the contact page', () => {
    renderApp('/esperienze')
    expect(screen.getByRole('link', { name: itContent.events.cta })).toHaveAttribute(
      'href',
      '/contatti',
    )
  })
})

describe('Territorio', () => {
  it('lists the nearby places with their notes', () => {
    renderApp('/territorio')
    for (const place of itContent.area.nearby) {
      expect(screen.getByText(place.name)).toBeInTheDocument()
      expect(screen.getByText(place.note)).toBeInTheDocument()
    }
  })
})

describe('Come Raggiungerci', () => {
  it('shows the real postal address in the page body', () => {
    renderApp('/come-raggiungerci')
    // Scoped to main: the footer carries the same address on every page.
    const main = screen.getByRole('main')
    expect(
      within(main).getByText(/Via Portelle 17, 81010 Prata Sannita \(CE\)/),
    ).toBeInTheDocument()
  })

  it('links out to Google Maps in a new tab', () => {
    renderApp('/come-raggiungerci')
    const link = screen.getByRole('link', { name: itContent.directions.mapCta })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link.getAttribute('href')).toContain('google.com/maps')
    expect(link.getAttribute('href')).toContain('Prata%20Sannita')
  })

  it('gives the drive times', () => {
    renderApp('/come-raggiungerci')
    for (const leg of itContent.directions.travel) {
      expect(screen.getByText(leg.from)).toBeInTheDocument()
      expect(screen.getByText(leg.time)).toBeInTheDocument()
    }
  })
})

describe('brand mark', () => {
  it('sits inside the home link in the header', () => {
    renderApp('/')
    const banner = screen.getByRole('banner')
    const homeLink = within(banner).getAllByRole('link', { name: itContent.siteName })[0]
    const img = homeLink.querySelector('img')
    expect(img).not.toBeNull()
    expect(img.getAttribute('src')).toContain('logo.webp')
  })

  it('is marked decorative so the wordmark is not announced twice', () => {
    renderApp('/')
    const img = screen.getByRole('banner').querySelector('img[src*="logo"]')
    // alt="" removes it from the accessibility tree; the adjacent text names
    // the venue already.
    expect(img).toHaveAttribute('alt', '')
    expect(
      within(screen.getByRole('banner')).getAllByRole('link', { name: itContent.siteName }).length,
    ).toBeGreaterThan(0)
  })

  it('loads eagerly, being above the fold', () => {
    renderApp('/')
    const img = screen.getByRole('banner').querySelector('img[src*="logo"]')
    expect(img).toHaveAttribute('loading', 'eager')
  })

  it('reserves its box to avoid shifting the header', () => {
    renderApp('/')
    const img = screen.getByRole('banner').querySelector('img[src*="logo"]')
    expect(img).toHaveAttribute('width', '256')
    expect(img).toHaveAttribute('height', '374')
  })
})

describe('Home pillars', () => {
  it('routes to each of the three offerings', () => {
    renderApp('/')
    for (const item of itContent.pillars.items) {
      const link = screen.getByRole('link', { name: new RegExp(item.title) })
      expect(link).toHaveAttribute('href', item.to)
    }
  })

  it('gives each pillar a heading and body', () => {
    renderApp('/')
    for (const item of itContent.pillars.items) {
      expect(screen.getByRole('heading', { name: item.title, level: 3 })).toBeInTheDocument()
      expect(screen.getByText(item.body)).toBeInTheDocument()
    }
  })

  it('marks pillar images decorative, the link text already naming them', () => {
    renderApp('/')
    const section = screen.getByRole('region', { name: itContent.pillars.heading })
    for (const img of section.querySelectorAll('img')) {
      expect(img).toHaveAttribute('alt', '')
    }
  })
})

describe('Reveal', () => {
  it('renders content with no hidden state applied server-side', () => {
    // jsdom has no IntersectionObserver, which is exactly the no-JS shape:
    // Reveal must leave the content untouched rather than hiding it.
    renderApp('/')
    expect(document.querySelectorAll('[data-reveal="hidden"]')).toHaveLength(0)
    expect(screen.getByText(itContent.faq.heading)).toBeVisible()
  })
})
