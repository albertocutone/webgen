import { Link } from 'react-router-dom'
import { useLocale } from '../../hooks/useLocale.js'
import { BOOKING_PATH } from '../../routes.js'
import Image from './Image.jsx'

/**
 * Home hero. Carries the page's single <h1>.
 *
 * The image is marked `priority` because it is the LCP element — lazy-loading
 * it would directly cost the Core Web Vitals target.
 */
export default function Hero() {
  const { t } = useLocale()

  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="images/placeholder-hero.svg"
        alt={t.home.heroAlt}
        width={1600}
        height={900}
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      {/*
        Scrim: keeps text legible whatever the eventual photograph looks like.
        A flat 35% tint was not enough over a light image, so this pairs a base
        tint with a bottom-weighted gradient behind the copy.
      */}
      <div
        className="absolute inset-0 -z-10 bg-stone-ink/45 bg-gradient-to-t from-stone-ink/70 via-stone-ink/20 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col justify-center px-6 py-24 text-limestone-50 md:min-h-[70vh]">
        <h1 className="text-4xl drop-shadow-sm md:text-6xl">{t.pages.home.title}</h1>
        <p className="mt-4 max-w-2xl text-lg drop-shadow-sm md:text-xl">{t.pages.home.lead}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to={BOOKING_PATH}
            className="rounded-full bg-terracotta-600 px-6 py-3 font-medium text-limestone-50 transition-colors hover:bg-terracotta-700"
          >
            {t.home.heroCta}
          </Link>
          <Link
            to="/appartamenti"
            className="rounded-full border border-limestone-50 px-6 py-3 font-medium text-limestone-50 transition-colors hover:bg-limestone-50/15"
          >
            {t.home.heroSecondary}
          </Link>
        </div>
      </div>
    </section>
  )
}
