import { Link } from 'react-router-dom'
import { useLocale } from '../hooks/useLocale.js'

export default function NotFound() {
  const { t } = useLocale()

  return (
    <section className="mx-auto max-w-3xl px-6 pt-16 pb-24 md:pt-24">
      <h1 className="text-4xl text-olive-700 md:text-6xl">{t.notFound.title}</h1>
      <p className="mt-5 text-lg text-stone-muted">{t.notFound.body}</p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-full bg-olive-600 px-6 py-3 text-limestone-50 transition-colors hover:bg-olive-700"
      >
        {t.notFound.back}
      </Link>
    </section>
  )
}
