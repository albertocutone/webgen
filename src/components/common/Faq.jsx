import { useLocale } from '../../hooks/useLocale.js'
import Reveal from './Reveal.jsx'

/**
 * FAQ accordion (F8).
 *
 * Built on native <details>/<summary>: keyboard operable, announced correctly
 * by screen readers, and expandable before JavaScript runs — which also means
 * the answers are visible to crawlers that do not execute scripts.
 */
export default function Faq() {
  const { t } = useLocale()

  return (
    <Reveal as="section" className="mx-auto max-w-3xl px-6 py-16" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-3xl text-olive-700">
        {t.faq.heading}
      </h2>

      <dl className="mt-8 divide-y divide-limestone-200 border-y border-limestone-200">
        {t.faq.items.map((item) => (
          <div key={item.q}>
            <details className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-medium text-stone-ink marker:content-['']">
                <dt>{item.q}</dt>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-xl text-olive-600 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <dd className="mt-3 text-stone-muted">{item.a}</dd>
            </details>
          </div>
        ))}
      </dl>
    </Reveal>
  )
}
