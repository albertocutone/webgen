import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderApp } from './renderApp.jsx'
import itContent from '../../src/content/it/site.js'
import { CONTACT } from '../../src/lib/constants.js'

beforeEach(() => {
  window.localStorage.clear()
  Object.defineProperty(window.navigator, 'language', { value: 'it-IT', configurable: true })
})

describe('WhatsAppButton', () => {
  it('links to the venue wa.me number', () => {
    renderApp('/')
    const link = screen.getByRole('link', { name: itContent.actions.whatsapp })
    expect(link).toHaveAttribute('href', `https://wa.me/${CONTACT.whatsapp}`)
  })

  it('opens in a new tab without leaking the referrer opener', () => {
    renderApp('/')
    const link = screen.getByRole('link', { name: itContent.actions.whatsapp })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })

  it('sits clear of the cookie banner until a choice is made', async () => {
    const user = userEvent.setup()
    renderApp('/')
    const link = screen.getByRole('link', { name: itContent.actions.whatsapp })

    // Banner visible: the button is lifted above it.
    expect(link.className).toContain('bottom-40')

    await user.click(screen.getByRole('button', { name: itContent.cookies.accept }))

    expect(link.className).toContain('bottom-6')
  })

  it('is present on every page', () => {
    for (const route of ['/', '/appartamenti', '/contatti']) {
      const { unmount } = renderApp(route)
      expect(screen.getByRole('link', { name: itContent.actions.whatsapp })).toBeInTheDocument()
      unmount()
    }
  })
})
