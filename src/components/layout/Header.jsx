import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_ROUTES, BOOKING_PATH } from '../../routes.js'
import { useLocale } from '../../hooks/useLocale.js'
import LanguageToggle from './LanguageToggle.jsx'
import Image from '../common/Image.jsx'

const MENU_ID = 'primary-navigation'

function navLinkClass({ isActive }) {
  // whitespace-nowrap: several labels are two words ("Pet Friendly", "Come
  // Raggiungerci") and wrapped mid-item at desktop widths.
  const base = 'whitespace-nowrap text-sm transition-colors hover:text-olive-700'
  return isActive ? `${base} text-olive-800 font-semibold` : `${base} text-stone-muted`
}

export default function Header() {
  const { t } = useLocale()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const toggleRef = useRef(null)

  // Navigating away should always dismiss the overlay, otherwise it covers the
  // page the user just asked for. Adjusted during render rather than in an
  // effect (React's documented pattern for state derived from a changing
  // value) so it also catches back/forward navigation, not just link clicks.
  const [lastPath, setLastPath] = useState(location.pathname)
  if (location.pathname !== lastPath) {
    setLastPath(location.pathname)
    setOpen(false)
  }

  // Escape closes the menu and returns focus to the control that opened it.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Stop the page behind the overlay from scrolling.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-limestone-200 bg-limestone-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          {/*
            The mark is decorative here: the adjacent wordmark already names the
            venue, so alt="" avoids a screen reader announcing it twice.
          */}
          <Image
            src="images/logo.webp"
            alt=""
            width={256}
            height={374}
            priority
            sizes="44px"
            className="h-7 w-auto sm:h-9 md:h-11"
          />
          {/*
            Below sm the mark, the wordmark, the CTA and the menu button do not
            fit together: the wordmark cannot shrink (nowrap) so it overflowed
            its slot and the CTA painted over it. max-sm:sr-only keeps the text
            in the accessibility tree — the link still has a name — while
            showing only the mark on the narrowest screens.
          */}
          <span
            className="whitespace-nowrap text-base leading-none text-olive-700 max-sm:sr-only sm:text-xl md:text-2xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t.siteName}
          </span>
        </Link>

        {/* Desktop navigation. Eight items plus logo, toggle and CTA do not fit
            at lg (1024px) — they wrapped — so full nav starts at xl. */}
        <nav className="hidden xl:block" aria-label={t.nav.home}>
          <ul className="flex items-center gap-4">
            {NAV_ROUTES.map((route) => (
              <li key={route.path}>
                <NavLink to={route.path} className={navLinkClass} end={route.path === '/'}>
                  {t.nav[route.navKey]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle className="hidden sm:flex" testId="language-header" />

          <Link
            to={BOOKING_PATH}
            className="rounded-full bg-terracotta-600 px-3 py-2 text-sm font-medium whitespace-nowrap text-limestone-50 transition-colors hover:bg-terracotta-700 sm:px-4"
          >
            {t.actions.bookNow}
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className="xl:hidden"
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label={open ? t.actions.closeMenu : t.actions.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" className="block text-2xl leading-none text-olive-700">
              {open ? '×' : '≡'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile overlay navigation */}
      {open && (
        <nav
          id={MENU_ID}
          className="border-t border-limestone-200 bg-limestone-50 xl:hidden"
          aria-label={t.actions.openMenu}
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-6 py-2">
            {NAV_ROUTES.map((route) => (
              <li key={route.path}>
                <NavLink
                  to={route.path}
                  className={({ isActive }) =>
                    `block border-b border-limestone-100 py-3 text-base ${
                      isActive ? 'font-semibold text-olive-800' : 'text-stone-muted'
                    }`
                  }
                  end={route.path === '/'}
                >
                  {t.nav[route.navKey]}
                </NavLink>
              </li>
            ))}
          </ul>
          <LanguageToggle className="px-6 pb-4 sm:hidden" testId="language-menu" />
        </nav>
      )}
    </header>
  )
}
