/**
 * Turns the venue's logo into web assets.
 *
 * The source is a JPEG of a dark mark on solid white, so dropping it into the
 * header as-is puts a white box on the limestone background. This derives an
 * alpha channel from luminance (white -> transparent, ink -> opaque) and
 * repaints the mark in the palette's ink colour, which keeps antialiased edges
 * smooth instead of the hard fringe a colour-key would leave.
 *
 * Outputs a transparent WebP for the header plus PNG favicons.
 */
import { existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import sharp from 'sharp'

const SOURCE = resolve(process.cwd(), 'assets/brand/logo.jpg')
const OUT = resolve(process.cwd(), 'public')
const INK = { r: 0x2b, g: 0x27, b: 0x23 } // --color-stone-ink

mkdirSync(resolve(OUT, 'images'), { recursive: true })

const { data, info } = await sharp(SOURCE).raw().toBuffer({ resolveWithObject: true })
const px = info.width * info.height

// Ink luminance = 2nd percentile, so the darkest few pixels do not skew the
// normalisation and the mark reaches full opacity.
const lum = new Float32Array(px)
for (let i = 0, p = 0; i < data.length; i += info.channels, p += 1) {
  lum[p] = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]
}
const inkL = [...lum].sort((a, b) => a - b)[Math.floor(px * 0.02)]
const range = Math.max(1, 255 - inkL)

const rgba = Buffer.alloc(px * 4)
for (let p = 0; p < px; p += 1) {
  const alpha = Math.max(0, Math.min(255, Math.round(((255 - lum[p]) / range) * 255)))
  rgba[p * 4] = INK.r
  rgba[p * 4 + 1] = INK.g
  rgba[p * 4 + 2] = INK.b
  rgba[p * 4 + 3] = alpha
}

const base = sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
  // Drop the generous white margin around the mark so the header can control
  // its own spacing.
  .trim({ threshold: 1 })

const trimmed = await base.png().toBuffer()
const meta = await sharp(trimmed).metadata()

await sharp(trimmed)
  .resize({ width: 256 })
  .webp({ quality: 92 })
  .toFile(resolve(OUT, 'images/logo.webp'))
await sharp(trimmed)
  .resize({ width: 180, height: 180, fit: 'contain', background: '#faf8f4' })
  .png()
  .toFile(resolve(OUT, 'apple-touch-icon.png'))
await sharp(trimmed)
  .resize({ width: 32, height: 32, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(resolve(OUT, 'favicon.png'))

// Social preview card. Facebook and WhatsApp scrapers handle JPEG reliably and
// WebP inconsistently, so this one stays JPEG. Built from the hero photograph
// rather than the mark: a photo of the place previews far better than a logo.
const HERO = resolve(process.cwd(), 'assets/photos/hero.jpg')
let ogImage = 'skipped (no hero photo)'
if (existsSync(HERO)) {
  await sharp(HERO)
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82 })
    .toFile(resolve(OUT, 'og-image.jpg'))
  ogImage = 'og-image.jpg'
}

console.log(
  `logo: trimmed to ${meta.width}x${meta.height}; wrote logo.webp, favicon.png, apple-touch-icon.png, ${ogImage}`,
)
