import { Link } from 'react-router-dom'
import { useLocale } from '../../hooks/useLocale.js'
import { useCookieConsent } from '../../hooks/useCookieConsent.jsx'

/**
 * EU cookie notice (F5).
 *
 * Accept and Decline are given equal visual weight — a prominent "Accept"
 * beside a muted "Decline" is a dark pattern and regulators treat it as
 * invalid consent. Nothing non-essential runs until a choice is recorded.
 */
export default function CookieBanner() {
  const { t } = useLocale()
  const { needsDecision, accept, decline } = useCookieConsent()

  if (!needsDecision) return null

  return (
    <div
      role="region"
      aria-label={t.cookies.label}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-limestone-300 bg-limestone-100 p-4 shadow-lg"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-stone-ink">
          {t.cookies.body}{' '}
          <Link to="/privacy" className="underline hover:text-olive-700">
            {t.cookies.more}
          </Link>
        </p>

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={decline}
            className="rounded-full border border-olive-600 px-5 py-2 text-sm font-medium text-olive-700 transition-colors hover:bg-limestone-200"
          >
            {t.cookies.decline}
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-full border border-olive-600 bg-olive-600 px-5 py-2 text-sm font-medium text-limestone-50 transition-colors hover:bg-olive-700"
          >
            {t.cookies.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
