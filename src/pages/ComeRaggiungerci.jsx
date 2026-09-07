import PageIntro from '../components/common/PageIntro.jsx'
import { useLocale } from '../hooks/useLocale.js'
import { ADDRESS_LINE, ADDRESS } from '../lib/constants.js'

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Masseria Mastrangelo, ${ADDRESS.street}, ${ADDRESS.postalCode} ${ADDRESS.locality}`,
)}`

export default function ComeRaggiungerci() {
  const { t } = useLocale()
  const d = t.directions

  return (
    <PageIntro id="comeRaggiungerci">
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <p className="text-stone-muted">{d.intro}</p>

        <h2 className="mt-10 text-2xl text-olive-700">{d.addressHeading}</h2>
        <address className="mt-3 not-italic text-stone-ink">{ADDRESS_LINE}</address>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm underline underline-offset-4 hover:text-olive-700"
        >
          {d.mapCta}
        </a>

        <h2 className="mt-10 text-2xl text-olive-700">{d.byCarHeading}</h2>
        <dl className="mt-4 divide-y divide-limestone-200 border-y border-limestone-200">
          {d.travel.map((leg) => (
            <div key={leg.from} className="flex flex-wrap justify-between gap-2 py-3">
              <dt className="text-stone-ink">{leg.from}</dt>
              <dd className="text-sm text-stone-muted">{leg.time}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-stone-muted">{d.parkingNote}</p>
      </section>
    </PageIntro>
  )
}
