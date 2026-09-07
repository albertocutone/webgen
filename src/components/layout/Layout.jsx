import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import CookieBanner from '../overlays/CookieBanner.jsx'
import WhatsAppButton from '../overlays/WhatsAppButton.jsx'
import { useLocale } from '../../hooks/useLocale.js'
import { useCookieConsent } from '../../hooks/useCookieConsent.jsx'
import { ROUTES } from '../../routes.js'
import Seo from '../common/Seo.jsx'

/**
 * A client-side route change does not reset scroll the way a document
 * navigation does, so a visitor clicking a nav link lands mid-page.
 */
function useScrollToTopOnNavigate() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
}

export default function Layout() {
  const { t } = useLocale()
  const { needsDecision } = useCookieConsent()
  const { pathname } = useLocation()
  useScrollToTopOnNavigate()

  // Unknown paths render the 404 page; give it its own metadata rather than
  // inheriting whatever the previous route set.
  const route = ROUTES.find((r) => r.path === pathname)
  const routeId = route?.id ?? 'notFound'

  return (
    // The cookie banner is fixed to the bottom, so without matching padding it
    // covers the last of the page once scrolled to the end.
    <div
      className={`flex min-h-screen flex-col ${needsDecision ? 'pb-36 sm:pb-24' : ''}`}
      data-testid="layout-root"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-olive-700 focus:px-4 focus:py-2 focus:text-limestone-50"
      >
        {t.actions.skipToContent}
      </a>

      <Seo routeId={routeId} path={route?.path ?? pathname} />

      <Header />

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <WhatsAppButton />
      <CookieBanner />
    </div>
  )
}
