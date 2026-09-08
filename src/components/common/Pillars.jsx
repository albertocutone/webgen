import { Link } from 'react-router-dom'
import { useLocale } from '../../hooks/useLocale.js'
import Image from './Image.jsx'
import Reveal from './Reveal.jsx'

/**
 * The three things the venue offers, immediately below the hero.
 *
 * The home page previously dropped straight from the hero into the FAQ, which
 * left the site's main offerings undiscoverable without using the nav. Each
 * card is a route into one of them.
 */
export default function Pillars() {
  const { t } = useLocale()

  return (
    <section className="mx-auto max-w-6xl px-6 py-20" aria-labelledby="pillars-heading">
      <Reveal>
        <h2 id="pillars-heading" className="text-3xl text-olive-700">
          {t.pillars.heading}
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {t.pillars.items.map((item, i) => (
          <Reveal key={item.id} delay={i * 90}>
            <Link
              to={item.to}
              className="group block h-full overflow-hidden rounded-xl border border-limestone-200 bg-limestone-100 transition-all duration-300 hover:-translate-y-1 hover:border-olive-400 hover:shadow-xl hover:shadow-stone-ink/10"
            >
              <div className="overflow-hidden">
                <Image
                  name={item.photo}
                  src="images/placeholder-room.svg"
                  alt=""
                  width={800}
                  height={600}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-olive-700">{item.title}</h3>
                <p className="mt-2 text-sm text-stone-muted">{item.body}</p>
                <span className="mt-4 inline-block text-sm font-medium text-terracotta-700 underline underline-offset-4 transition-transform duration-300 group-hover:translate-x-1">
                  {item.cta} →
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
