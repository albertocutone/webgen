import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderApp } from './renderApp.jsx'
import itContent from '../../src/content/it/site.js'
import enContent from '../../src/content/en/site.js'

beforeEach(() => {
  window.localStorage.clear()
  Object.defineProperty(window.navigator, 'language', { value: 'it-IT', configurable: true })
})

describe('Faq', () => {
  it('renders every question on the home page', () => {
    renderApp('/')
    for (const item of itContent.faq.items) {
      expect(screen.getByText(item.q)).toBeInTheDocument()
    }
  })

  it('starts collapsed', () => {
    renderApp('/')
    const details = document.querySelectorAll('details')
    expect(details.length).toBe(itContent.faq.items.length)
    for (const d of details) expect(d.open).toBe(false)
  })

  it('expands an answer when its question is activated', async () => {
    const user = userEvent.setup()
    renderApp('/')

    const first = itContent.faq.items[0]
    await user.click(screen.getByText(first.q))

    expect(screen.getByText(first.q).closest('details').open).toBe(true)
  })

  it('keeps answers in the DOM while collapsed, so crawlers can read them', () => {
    renderApp('/')
    for (const item of itContent.faq.items) {
      expect(screen.getByText(item.a)).toBeInTheDocument()
    }
  })

  it('has matching question counts across locales', () => {
    expect(enContent.faq.items).toHaveLength(itContent.faq.items.length)
  })

  it('is scoped by an accessible heading', () => {
    renderApp('/')
    expect(screen.getByRole('region', { name: itContent.faq.heading })).toBeInTheDocument()
  })
})
