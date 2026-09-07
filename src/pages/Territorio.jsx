import PageIntro from '../components/common/PageIntro.jsx'
import { useLocale } from '../hooks/useLocale.js'

export default function Territorio() {
  const { t } = useLocale()

  return (
    <PageIntro id="territorio">
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <p className="text-stone-muted">{t.area.intro}</p>

        <h2 className="mt-10 text-2xl text-olive-700">{t.area.nearbyHeading}</h2>
        <dl className="mt-6 divide-y divide-limestone-200 border-y border-limestone-200">
          {t.area.nearby.map((place) => (
            <div key={place.name} className="py-4">
              <dt className="font-medium text-stone-ink">{place.name}</dt>
              <dd className="mt-1 text-sm text-stone-muted">{place.note}</dd>
            </div>
          ))}
        </dl>
      </section>
    </PageIntro>
  )
}
