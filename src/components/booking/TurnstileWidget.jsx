import { useEffect, useRef } from 'react'

const SCRIPT_ID = 'cf-turnstile-script'
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

/** Loads the Turnstile script once, shared across mounts. */
function loadTurnstileScript() {
  if (window.turnstile) return Promise.resolve(window.turnstile)

  const existing = document.getElementById(SCRIPT_ID)
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener('load', () => resolve(window.turnstile))
      existing.addEventListener('error', reject)
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = SCRIPT_SRC
    script.async = true
    script.defer = true
    script.addEventListener('load', () => resolve(window.turnstile))
    script.addEventListener('error', () => reject(new Error('Turnstile script failed to load')))
    document.head.appendChild(script)
  })
}

/**
 * Cloudflare Turnstile bot check.
 *
 * Renders nothing when `siteKey` is empty. That is the dev, test and
 * not-yet-configured path: the form must stay usable rather than being
 * permanently blocked by a captcha that cannot load. Real protection depends
 * on Web3Forms verifying the token server-side.
 */
export default function TurnstileWidget({ siteKey, onToken, onError }) {
  const containerRef = useRef(null)
  // Kept in a ref so the effect does not re-run when the callbacks change
  // identity, which would re-render the widget on every keystroke.
  const handlers = useRef({ onToken, onError })
  handlers.current = { onToken, onError }

  useEffect(() => {
    if (!siteKey) return

    let widgetId
    let cancelled = false

    loadTurnstileScript()
      .then((turnstile) => {
        if (cancelled || !containerRef.current) return
        widgetId = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token) => handlers.current.onToken?.(token),
          'expired-callback': () => handlers.current.onToken?.(''),
          'error-callback': () => handlers.current.onError?.(),
        })
      })
      .catch(() => {
        if (!cancelled) handlers.current.onError?.()
      })

    return () => {
      cancelled = true
      if (widgetId !== undefined && window.turnstile?.remove) {
        try {
          window.turnstile.remove(widgetId)
        } catch {
          // Widget already torn down with the DOM node; nothing to clean up.
        }
      }
    }
  }, [siteKey])

  if (!siteKey) return null

  return <div ref={containerRef} className="mt-2" data-testid="turnstile" />
}
