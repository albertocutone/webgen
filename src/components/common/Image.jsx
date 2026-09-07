/**
 * Site image wrapper.
 *
 * Always takes explicit width/height so the browser reserves the box before
 * the file arrives — layout shift is the easiest way to lose the Core Web
 * Vitals target in design §2. Everything below the fold is lazy; the hero must
 * pass `priority` so it is not deferred, since it is the LCP element.
 *
 * `src` is resolved against BASE_URL so images work under the /webgen/ project
 * path and at / on a custom domain. BASE_URL comes from config.js rather than
 * import.meta.env, which Jest cannot parse.
 */
import { BASE_URL } from '../../lib/config.js'

export default function Image({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes,
}) {
  const resolved = src.startsWith('http')
    ? src
    : `${BASE_URL.replace(/\/$/, '')}/${src.replace(/^\//, '')}`

  return (
    <img
      src={resolved}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={className}
    />
  )
}
