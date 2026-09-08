import { Link } from 'react-router-dom'
import PageIntro from '../components/common/PageIntro.jsx'
import Image from '../components/common/Image.jsx'
import { useLocale } from '../hooks/useLocale.js'
import { BOOKING_PATH } from '../routes.js'
import { roomLeadImage } from '../lib/images.js'

function UnitCard({ unit }) {
  const { t } = useLocale()

  return (
    <article className="overflow-hidden rounded-lg border border-limestone-200 bg-limestone-100">
      <Image
        // Whatever the owner drops into assets/photos/rooms/<id>/ becomes this
        // card's photo; until then the placeholder stands in.
        name={roomLeadImage(unit.id)}
        src="images/placeholder-room.svg"
        alt={unit.name}
        width={800}
        height={600}
        sizes="(min-width: 768px) 33vw, 100vw"
        className="aspect-[4/3] w-full object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl text-olive-700">{unit.name}</h3>
        <p className="mt-1 text-sm text-stone-muted">
          {unit.guests} {t.apartments.guestsLabel}
        </p>
        <p className="mt-3 text-sm text-stone-ink">{unit.description}</p>
        <Link
          to={BOOKING_PATH}
          className="mt-4 inline-block text-sm font-medium text-terracotta-700 underline underline-offset-4 hover:text-terracotta-600"
        >
          {t.apartments.enquire}
          <span className="sr-only"> — {unit.name}</span>
        </Link>
      </div>
    </article>
  )
}

export default function Appartamenti() {
  const { t } = useLocale()

  return (
    <PageIntro id="appartamenti">
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <p className="max-w-2xl text-stone-muted">{t.apartments.intro}</p>

        <h2 className="sr-only">{t.apartments.amenitiesHeading}</h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {t.apartments.amenities.map((amenity) => (
            <li
              key={amenity}
              className="rounded-full border border-olive-400 bg-limestone-100 px-3 py-1 text-sm text-olive-700"
            >
              {amenity}
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {t.apartments.items.map((unit) => (
            <UnitCard key={unit.id} unit={unit} />
          ))}
        </div>
      </section>
    </PageIntro>
  )
}
