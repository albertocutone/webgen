import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderApp } from './renderApp.jsx'
import { ROUTES, NAV_ROUTES } from '../../src/routes.js'
import itContent from '../../src/content/it/site.js'

beforeEach(() => {
  window.localStorage.clear()
  Object.defineProperty(window.navigator, 'language', { value: 'it-IT', configurable: true })
})

describe('routing', () => {
  it.each(ROUTES.map((r) => [r.path, r.id]))('renders %s with its own h1', (path, id) => {
    renderApp(path)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(itContent.pages[id].title)
  })

  it('renders exactly one h1 per page', () => {
    renderApp('/appartamenti')
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('shows the 404 page for an unknown path', () => {
    renderApp('/questa-pagina-non-esiste')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(itContent.notFound.title)
  })

  it('every navigable route has a content bundle entry', () => {
    for (const route of ROUTES) {
      expect(itContent.pages[route.id]).toBeDefined()
    }
  })
})

describe('layout chrome', () => {
  it('exposes a skip link, banner, main and contentinfo landmarks', () => {
    renderApp('/')
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: itContent.actions.skipToContent })).toHaveAttribute(
      'href',
      '#main',
    )
  })

  it('links the Book Now CTA to the enquiry page', () => {
    renderApp('/')
    const cta = screen.getAllByRole('link', { name: itContent.actions.bookNow })[0]
    expect(cta).toHaveAttribute('href', '/contatti')
  })

  it('renders every nav route in the header', () => {
    renderApp('/')
    const banner = screen.getByRole('banner')
    for (const route of NAV_ROUTES) {
      expect(
        screen.getAllByRole('link', { name: itContent.nav[route.navKey] }).length,
      ).toBeGreaterThan(0)
    }
    expect(banner).toBeInTheDocument()
  })

  it('navigates client-side when a nav link is clicked', async () => {
    const user = userEvent.setup()
    renderApp('/')

    await user.click(screen.getAllByRole('link', { name: itContent.nav.appartamenti })[0])

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      itContent.pages.appartamenti.title,
    )
  })
})

describe('mobile menu', () => {
  it('is collapsed initially and toggles open', async () => {
    const user = userEvent.setup()
    renderApp('/')

    const toggle = screen.getByRole('button', { name: itContent.actions.openMenu })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)

    expect(screen.getByRole('button', { name: itContent.actions.closeMenu })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    renderApp('/')

    await user.click(screen.getByRole('button', { name: itContent.actions.openMenu }))
    await user.keyboard('{Escape}')

    expect(screen.getByRole('button', { name: itContent.actions.openMenu })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })

  it('closes after navigating', async () => {
    const user = userEvent.setup()
    renderApp('/')

    await user.click(screen.getByRole('button', { name: itContent.actions.openMenu }))
    const links = screen.getAllByRole('link', { name: itContent.nav.territorio })
    await user.click(links[links.length - 1])

    expect(screen.getByRole('button', { name: itContent.actions.openMenu })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })
})

describe('language toggle', () => {
  it('switches the whole page to English', async () => {
    const user = userEvent.setup()
    renderApp('/chi-siamo')

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Chi Siamo')

    await user.click(screen.getAllByRole('button', { name: /English/ })[0])

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About Us')
  })
})
