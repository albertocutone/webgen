import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../../src/App.jsx'
import { LocaleProvider } from '../../src/i18n/LocaleContext.jsx'
import { CookieConsentProvider } from '../../src/hooks/useCookieConsent.jsx'

/** Renders the whole app at a given route, inside the real providers. */
export function renderApp(route = '/') {
  return render(
    <LocaleProvider>
      <CookieConsentProvider>
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      </CookieConsentProvider>
    </LocaleProvider>,
  )
}
