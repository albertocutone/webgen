import { screen } from '@testing-library/react'
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
