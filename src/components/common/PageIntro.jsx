import { useLocale } from '../../hooks/useLocale.js'

/**
 * Standard page opening: the single <h1> plus its lead paragraph, both pulled
 * from the active locale's `pages[id]` bundle. Page-specific sections are
 * passed as children and render below the intro.
 */
export default function PageIntro({ id, children }) {
  const { t } = useLocale()
  const page = t.pages[id]

  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-10 md:pt-24">
        <h1 className="text-4xl text-olive-700 md:text-6xl">{page.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-muted md:text-xl">{page.lead}</p>
      </section>
      {children}
    </>
  )
}
