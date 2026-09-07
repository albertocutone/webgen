import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../../src/App.jsx'
import { LocaleProvider } from '../../src/i18n/LocaleContext.jsx'

/** Renders the whole app at a given route, inside the locale provider. */
export function renderApp(route = '/') {
  return render(
    <LocaleProvider>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </LocaleProvider>,
  )
}
