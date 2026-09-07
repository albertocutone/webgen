/**
 * Turns source photography into responsive WebP (design §7).
 *
 * Drop originals into assets/photos/ at whatever size the camera produced.
 * This emits public/images/<name>-<width>.webp at each useful width and writes
 * src/generated/images.json recording the intrinsic dimensions, so <img> can
 * carry width/height and reserve its box before the file arrives.
 *
 * Idempotent: an output newer than its source is left alone, so rebuilds are
 * cheap.
 */
import { mkdirSync, readdirSync, statSync, writeFileSync, existsSync } from 'node:fs'
import { extname, basename, resolve, join } from 'node:path'
import sharp from 'sharp'

const SOURCE_DIR = resolve(process.cwd(), 'assets/photos')
const OUT_DIR = resolve(process.cwd(), 'public/images')
const MANIFEST = resolve(process.cwd(), 'src/generated/images.json')

// Covers a 390px phone at 2x through a 1440px desktop at ~1.7x.
const WIDTHS = [480, 768, 1200, 1800, 2400]
const SOURCE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff'])
const QUALITY = 78

mkdirSync(OUT_DIR, { recursive: true })
mkdirSync(resolve(process.cwd(), 'src/generated'), { recursive: true })

const sources = existsSync(SOURCE_DIR)
  ? readdirSync(SOURCE_DIR).filter((f) => SOURCE_EXT.has(extname(f).toLowerCase()))
  : []

const manifest = {}
let written = 0
let skipped = 0

for (const file of sources) {
  const sourcePath = join(SOURCE_DIR, file)
  const name = basename(file, extname(file))
  const sourceStat = statSync(sourcePath)

  const image = sharp(sourcePath)
  const { width: intrinsicWidth, height: intrinsicHeight } = await image.metadata()

  // Never upscale: a 900px original gains nothing from a 2400px variant.
  const widths = WIDTHS.filter((w) => w <= intrinsicWidth)
  if (widths.length === 0) widths.push(intrinsicWidth)

  for (const width of widths) {
    const outPath = join(OUT_DIR, `${name}-${width}.webp`)
    if (existsSync(outPath) && statSync(outPath).mtimeMs >= sourceStat.mtimeMs) {
      skipped += 1
      continue
    }
    await sharp(sourcePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath)
    written += 1
  }

  manifest[name] = {
    width: intrinsicWidth,
    height: intrinsicHeight,
    widths,
  }
}

writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(
  `images: ${sources.length} source(s), ${written} variant(s) written, ${skipped} up to date`,
)
