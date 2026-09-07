import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

/**
 * Cross-fades between routes (F10).
 *
 * Two deliberate constraints:
 *
 * 1. `initial={false}` on AnimatePresence. Without it the first render starts
 *    at opacity 0, which the prerenderer would bake into the static HTML as
 *    inline `opacity:0` — a crawler that does not run JS would fetch a page of
 *    invisible text. Transitions only apply to subsequent navigation.
 *
 * 2. Motion is dropped entirely under prefers-reduced-motion. A fade is
 *    harmless but vestibular triggers are not, and honouring the setting is
 *    free.
 */
export default function PageTransition({ children }) {
  const { pathname } = useLocation()
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return children

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
