/* global __WEB3FORMS_KEY__, __TURNSTILE_SITE_KEY__ */

/**
 * Build-time configuration.
 *
 * Vite replaces these identifiers at build time (see `define` in
 * vite.config.js) from VITE_*-prefixed env vars. Plain globals are used rather
 * than `import.meta.env` because Jest cannot parse `import.meta`, and the
 * workarounds (a babel plugin) left this module as ESM that Jest then refused
 * to require. Under Jest the identifiers are simply undefined and the guards
 * yield '', which is exactly the "not configured" path we want in tests.
 *
 * Both keys are public by design: they ship inside the JS bundle and are meant
 * to be visible to the browser. Neither is a secret (design §9).
 */

/** Web3Forms access key. Empty disables real submission. */
export const WEB3FORMS_KEY = typeof __WEB3FORMS_KEY__ === 'string' ? __WEB3FORMS_KEY__ : ''

/** Cloudflare Turnstile site key. Empty disables the widget (design §5.4). */
export const TURNSTILE_SITE_KEY =
  typeof __TURNSTILE_SITE_KEY__ === 'string' ? __TURNSTILE_SITE_KEY__ : ''
