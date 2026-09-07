import { BASE_URL } from '../../lib/config.js'
import manifest from '../../generated/images.json'

/**
 * Site image.
 *
 * Two modes:
 *
 * - `name` — a photograph processed by scripts/optimize-images.mjs. Renders a
 *   responsive WebP srcset from the generated manifest.
 * - `src` — a literal file (the placeholder SVGs). Rendered as-is.
 *
 * Passing `name` with no matching manifest entry falls back to `src`, so pages
 * keep working before the owner's photography arrives and upgrade themselves
 * the moment a matching file lands in assets/photos/.
 *
 * width/height are always set: reserving the box before the file arrives is
 * the cheapest way to protect the CLS half of the Core Web Vitals target
 * (design §2). Everything is lazy except `priority`, which the LCP element
 * must use.
 *
 * BASE_URL comes from config.js rather than import.meta.env, which Jest
 * cannot parse.
 */
function withBase(path) {
  if (path.startsWith('http')) return path
  return `${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

export default function Image({
  name,
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '100vw',
}) {
  const entry = name ? manifest[name] : null

  const loadingProps = {
    loading: priority ? 'eager' : 'lazy',
    decoding: priority ? 'sync' : 'async',
    fetchPriority: priority ? 'high' : undefined,
  }

  if (!entry) {
    // Placeholder or un-processed image.
    return (
      <img
        src={withBase(src)}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={className}
        {...loadingProps}
      />
    )
  }

  const largest = entry.widths[entry.widths.length - 1]
  const srcSet = entry.widths.map((w) => `${withBase(`images/${name}-${w}.webp`)} ${w}w`).join(', ')

  return (
    <img
      src={withBase(`images/${name}-${largest}.webp`)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={entry.width}
      height={entry.height}
      className={className}
      {...loadingProps}
    />
  )
}
