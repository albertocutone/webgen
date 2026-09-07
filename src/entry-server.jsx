import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.jsx'
import { LocaleProvider } from './i18n/LocaleContext.jsx'
import { CookieConsentProvider } from './hooks/useCookieConsent.jsx'

/**
 * Server entry used only by scripts/prerender.mjs at build time.
 *
 * Both providers already guard `typeof window === 'undefined'`, so they fall
 * back to the Italian default and "no cookie decision yet" — which is exactly
 * the state a first-time crawler should see.
 */
export function render(url) {
  return renderToString(
    <LocaleProvider>
      <CookieConsentProvider>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </CookieConsentProvider>
    </LocaleProvider>,
  )
}
