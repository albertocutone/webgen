import { Link } from 'react-router-dom'
import PageIntro from '../components/common/PageIntro.jsx'
import Image from '../components/common/Image.jsx'
import { useLocale } from '../hooks/useLocale.js'
import { BOOKING_PATH } from '../routes.js'
import Reveal from '../components/common/Reveal.jsx'

export default function Esperienze() {
  const { t } = useLocale()
  const e = t.events

  return (
    <PageIntro id="esperienze">
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <p className="max-w-2xl text-stone-muted">{e.intro}</p>

        {/*
          Stated plainly and early: the venue is not a walk-in restaurant.
          Leaving it implicit means people arrive expecting dinner.
        */}
        <p className="mt-4 max-w-2xl rounded-md border-l-4 border-terracotta-500 bg-limestone-100 py-3 pl-4 text-sm text-stone-ink">
          {e.notRestaurant}
        </p>

        <h2 className="mt-12 text-2xl text-olive-700">{e.typesHeading}</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {e.types.map((type) => (
            <li
              key={type}
              className="text-stone-ink before:mr-2 before:text-olive-500 before:content-['—']"
            >
              {type}
            </li>
          ))}
        </ul>

        <h2 className="mt-14 text-2xl text-olive-700">{e.galleryHeading}</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {e.photos.map((photo, i) => (
            <Reveal key={photo.id} delay={i * 80}>
              <figure className="group overflow-hidden rounded-xl border border-limestone-200">
                <Image
                  name={photo.id}
                  src="images/placeholder-room.svg"
                  alt={photo.alt}
                  width={800}
                  height={600}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </figure>
            </Reveal>
          ))}
        </div>

        <Link
          to={BOOKING_PATH}
          className="mt-10 inline-block rounded-full bg-terracotta-600 px-6 py-3 font-medium text-limestone-50 transition-colors hover:bg-terracotta-700"
        >
          {e.cta}
        </Link>
      </section>
    </PageIntro>
  )
}
