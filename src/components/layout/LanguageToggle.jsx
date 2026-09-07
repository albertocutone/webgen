import { useLocale } from '../../hooks/useLocale.js'
import { LOCALES } from '../../content/index.js'

const LABEL = { it: 'IT', en: 'EN' }
const FULL = { it: 'Italiano', en: 'English' }

/**
 * IT/EN switch. Rendered as buttons in a group rather than flag images:
 * flags denote countries, not languages, and are unreadable to screen readers.
 */
export default function LanguageToggle({ className = '' }) {
  const { locale, setLocale } = useLocale()

  return (
    <div
      className={`flex items-center gap-1 text-sm ${className}`}
      role="group"
      aria-label="Lingua / Language"
    >
      {LOCALES.map((code) => {
        const active = code === locale
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-current={active ? 'true' : undefined}
            lang={code}
            className={
              active
                ? 'rounded px-2 py-1 font-semibold text-olive-800 underline underline-offset-4'
                : 'rounded px-2 py-1 text-stone-muted transition-colors hover:text-olive-700'
            }
          >
            <span aria-hidden="true">{LABEL[code]}</span>
            <span className="sr-only">{FULL[code]}</span>
          </button>
        )
      })}
    </div>
  )
}
