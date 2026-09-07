import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import CookieBanner from '../overlays/CookieBanner.jsx'
import WhatsAppButton from '../overlays/WhatsAppButton.jsx'
import { useLocale } from '../../hooks/useLocale.js'

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
  useScrollToTopOnNavigate()

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-olive-700 focus:px-4 focus:py-2 focus:text-limestone-50"
      >
        {t.actions.skipToContent}
      </a>

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
