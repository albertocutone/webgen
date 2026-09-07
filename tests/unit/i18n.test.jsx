import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LocaleProvider } from '../../src/i18n/LocaleContext.jsx'
import { useLocale } from '../../src/hooks/useLocale.js'
import { getContent, LOCALES } from '../../src/content/index.js'
import itContent from '../../src/content/it/site.js'
import enContent from '../../src/content/en/site.js'

/** Every leaf key path in an object, e.g. "nav.home". */
function keyPaths(obj, prefix = '') {
  return Object.entries(obj).flatMap(([k, v]) =>
    v !== null && typeof v === 'object' ? keyPaths(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  )
}

function Probe() {
  const { locale, setLocale, t } = useLocale()
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="book">{t.actions.bookNow}</span>
      <button onClick={() => setLocale('en')}>to en</button>
      <button onClick={() => setLocale('xx')}>to bogus</button>
    </div>
  )
}

describe('content bundles', () => {
  it('expose the same key paths in every locale', () => {
    expect(keyPaths(enContent).sort()).toEqual(keyPaths(itContent).sort())
  })

  it('fall back to Italian for an unknown locale', () => {
    expect(getContent('xx')).toBe(itContent)
  })

  it('resolve every supported locale', () => {
    for (const l of LOCALES) {
      expect(getContent(l).locale).toBe(l)
    }
  })
})

/** jsdom reports en-US, which would silently drive locale detection. */
function setBrowserLanguage(lang) {
  Object.defineProperty(window.navigator, 'language', { value: lang, configurable: true })
}

describe('LocaleProvider', () => {
  beforeEach(() => {
    window.localStorage.clear()
    setBrowserLanguage('de-DE') // unsupported, so the Italian default is exercised
  })

  it('defaults to Italian and exposes its copy', () => {
    render(
      <LocaleProvider>
        <Probe />
      </LocaleProvider>,
    )
    expect(screen.getByTestId('locale')).toHaveTextContent('it')
    expect(screen.getByTestId('book')).toHaveTextContent('Prenota Ora')
  })

  it('honours a supported browser language when nothing is stored', () => {
    setBrowserLanguage('en-GB')
    render(
      <LocaleProvider>
        <Probe />
      </LocaleProvider>,
    )
    expect(screen.getByTestId('locale')).toHaveTextContent('en')
  })

  it('prefers a stored choice over the browser language', () => {
    setBrowserLanguage('en-GB')
    window.localStorage.setItem('mm.locale', 'it')
    render(
      <LocaleProvider>
        <Probe />
      </LocaleProvider>,
    )
    expect(screen.getByTestId('locale')).toHaveTextContent('it')
  })

  it('switches locale, persists it, and updates <html lang>', async () => {
    const user = userEvent.setup()
    render(
      <LocaleProvider>
        <Probe />
      </LocaleProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'to en' }))

    expect(screen.getByTestId('locale')).toHaveTextContent('en')
    expect(screen.getByTestId('book')).toHaveTextContent('Book Now')
    expect(document.documentElement.lang).toBe('en')
    expect(window.localStorage.getItem('mm.locale')).toBe('en')
  })

  it('ignores an unsupported locale', async () => {
    const user = userEvent.setup()
    render(
      <LocaleProvider>
        <Probe />
      </LocaleProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'to bogus' }))
    expect(screen.getByTestId('locale')).toHaveTextContent('it')
  })

  it('restores a previously stored choice', () => {
    window.localStorage.setItem('mm.locale', 'en')
    render(
      <LocaleProvider>
        <Probe />
      </LocaleProvider>,
    )
    expect(screen.getByTestId('locale')).toHaveTextContent('en')
  })

  it('survives localStorage throwing (Safari private mode)', () => {
    const spy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('denied')
    })

    expect(() =>
      render(
        <LocaleProvider>
          <Probe />
        </LocaleProvider>,
      ),
    ).not.toThrow()

    spy.mockRestore()
  })
})

describe('useLocale', () => {
  it('throws a helpful error outside a provider', () => {
    const quiet = jest.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<Probe />)).toThrow(/must be used inside a <LocaleProvider>/)
    quiet.mockRestore()
  })
})

/**
 * Italian copy written through shell heredocs has twice lost its accents
 * ("disponibilita", "non e ancora"), which reads as broken to the site's
 * primary audience. This scans for the specific unaccented forms.
 */
describe('Italian copy quality', () => {
  const ALL_TEXT = JSON.stringify(itContent)

  it.each([
    'disponibilita',
    'puo essere',
    'piu presto',
    'un altra',
    'non e ancora',
    'perche',
    'gia ',
    'cosi ',
    'piu tardi',
  ])('never contains the unaccented form %p', (bad) => {
    expect(ALL_TEXT.toLowerCase()).not.toContain(bad)
  })

  it('uses accented characters somewhere, proving encoding survived', () => {
    expect(ALL_TEXT).toMatch(/[àèéìòùÀÈÉÌÒÙ’]/)
  })
  it('uses typographic apostrophes consistently, never the straight quote', () => {
    // Mixing l'intera and l’intera looks sloppy in rendered copy.
    const elisions = ALL_TEXT.match(/\w'\w/g) ?? []
    expect(elisions).toEqual([])
  })
})
