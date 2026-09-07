import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderApp } from './renderApp.jsx'
import itContent from '../../src/content/it/site.js'

const c = itContent.cookies

beforeEach(() => {
  window.localStorage.clear()
  Object.defineProperty(window.navigator, 'language', { value: 'it-IT', configurable: true })
})

describe('CookieBanner', () => {
  it('appears on a first visit', () => {
    renderApp('/')
    expect(screen.getByRole('region', { name: c.label })).toBeInTheDocument()
  })

  it('offers accept and decline with equal prominence', () => {
    renderApp('/')
    const accept = screen.getByRole('button', { name: c.accept })
    const decline = screen.getByRole('button', { name: c.decline })

    expect(accept).toBeInTheDocument()
    expect(decline).toBeInTheDocument()
    // Both are real buttons of the same size; a muted decline is a dark
    // pattern and invalidates consent.
    expect(accept.className).toContain('px-5 py-2')
    expect(decline.className).toContain('px-5 py-2')
  })

  it('hides and records the choice when accepted', async () => {
    const user = userEvent.setup()
    renderApp('/')

    await user.click(screen.getByRole('button', { name: c.accept }))

    expect(screen.queryByRole('region', { name: c.label })).not.toBeInTheDocument()
    expect(window.localStorage.getItem('mm.cookieConsent')).toBe('accepted')
  })

  it('hides and records the choice when declined', async () => {
    const user = userEvent.setup()
    renderApp('/')

    await user.click(screen.getByRole('button', { name: c.decline }))

    expect(screen.queryByRole('region', { name: c.label })).not.toBeInTheDocument()
    expect(window.localStorage.getItem('mm.cookieConsent')).toBe('declined')
  })

  it('stays hidden on a later visit once decided', () => {
    window.localStorage.setItem('mm.cookieConsent', 'declined')
    renderApp('/')
    expect(screen.queryByRole('region', { name: c.label })).not.toBeInTheDocument()
  })

  it('ignores a corrupted stored value and asks again', () => {
    window.localStorage.setItem('mm.cookieConsent', 'garbage')
    renderApp('/')
    expect(screen.getByRole('region', { name: c.label })).toBeInTheDocument()
  })

  it('links to the privacy policy', () => {
    renderApp('/')
    const banner = screen.getByRole('region', { name: c.label })
    expect(banner.querySelector('a[href="/privacy"]')).not.toBeNull()
  })
  it('reserves space so the fixed banner does not cover page content', async () => {
    const user = userEvent.setup()
    renderApp('/')

    expect(screen.getByTestId('layout-root').className).toContain('pb-36')

    await user.click(screen.getByRole('button', { name: c.accept }))

    expect(screen.getByTestId('layout-root').className).not.toContain('pb-36')
  })
})
