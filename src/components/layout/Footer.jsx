import { Link } from 'react-router-dom'
import { NAV_ROUTES } from '../../routes.js'
import { useLocale } from '../../hooks/useLocale.js'
import { ADDRESS_LINE, CONTACT } from '../../lib/constants.js'

export default function Footer() {
  const { t } = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-limestone-200 bg-limestone-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h2 className="text-xl text-olive-700">{t.siteName}</h2>
          <p className="mt-2 text-sm text-stone-muted">{t.tagline}</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-stone-ink">{t.footer.contactHeading}</h2>
          <ul className="mt-3 space-y-2 text-sm text-stone-muted">
            <li>
              <a className="hover:text-olive-700" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a className="hover:text-olive-700" href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>
                {CONTACT.phone}
              </a>
            </li>
            <li>{ADDRESS_LINE}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold text-stone-ink">{t.footer.legalHeading}</h2>
          <ul className="mt-3 space-y-2 text-sm text-stone-muted">
            <li>
              <Link className="hover:text-olive-700" to="/privacy">
                {t.footer.privacy}
              </Link>
            </li>
          </ul>

          <nav className="mt-6" aria-label={t.footer.legalHeading}>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-stone-muted">
              {NAV_ROUTES.map((route) => (
                <li key={route.path}>
                  <Link className="hover:text-olive-700" to={route.path}>
                    {t.nav[route.navKey]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-limestone-200 px-6 py-5 text-center text-xs text-stone-muted">
        © {year} {t.siteName}. {t.footer.rights}
      </div>
    </footer>
  )
}
