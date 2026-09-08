import { useEffect, useRef } from 'react'

/**
 * Fades content up as it scrolls into view.
 *
 * Three constraints shape this, and they rule out the obvious
 * `whileInView` approach:
 *
 * 1. **The hidden state is applied by JavaScript, never in the markup.** Every
 *    route is prerendered, so an `opacity: 0` baked into the static HTML would
 *    hand crawlers and no-JS visitors an invisible page. Here the element
 *    renders plainly and only becomes hidden once JS has run.
 *
 * 2. **Anything already on screen at mount is left alone.** Hiding then
 *    revealing it would produce a visible flash on load.
 *
 * 3. **`prefers-reduced-motion` disables it entirely** — checked at mount, so
 *    nothing is ever hidden from a visitor who asked for no motion.
 *
 * The animation itself is CSS (see index.css); this only toggles a data
 * attribute, which keeps it off the main thread and out of React's render.
 */
export default function Reveal({ children, as: Tag = 'div', delay = 0, className = '', ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    if (typeof IntersectionObserver === 'undefined') return

    // Already visible: leave it be rather than flashing it out and back in.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.9) return

    el.dataset.reveal = 'hidden'
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.dataset.reveal = 'shown'
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    // ...rest is spread so wrapping a landmark in Reveal cannot quietly strip
    // its aria-labelledby and drop it out of the accessibility tree.
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
