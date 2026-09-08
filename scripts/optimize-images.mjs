/**
 * Turns source photography into responsive WebP (design §7).
 *
 * Drop originals into assets/photos/ at whatever size the camera produced,
 * in whatever folder structure suits. This emits
 * public/images/<same-path>-<width>.webp at each useful width and writes
 * src/generated/images.json recording intrinsic dimensions, so every <img>
 * can reserve its box before the file arrives.
 *
 * Sub-folders are preserved and become part of the key:
 *   assets/photos/hero.jpg                    -> "hero"
 *   assets/photos/rooms/doppia/interno.jpg    -> "rooms/doppia/interno"
 *
 * Idempotent: an output newer than its source is left alone.
 */
import { mkdirSync, readdirSync, statSync, writeFileSync, existsSync } from 'node:fs'
import { extname, resolve, join, dirname, relative, sep } from 'node:path'
import sharp from 'sharp'

const SOURCE_DIR = resolve(process.cwd(), 'assets/photos')
const OUT_DIR = resolve(process.cwd(), 'public/images')
const MANIFEST = resolve(process.cwd(), 'src/generated/images.json')

// Covers a 390px phone at 2x through a 1440px desktop at ~1.7x.
const WIDTHS = [480, 768, 1200, 1800, 2400]
const SOURCE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff'])
const QUALITY = 78

/** Every image under `dir`, recursively, as paths relative to SOURCE_DIR. */
function collect(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) return collect(full)
    return SOURCE_EXT.has(extname(entry.name).toLowerCase()) ? [full] : []
  })
}

mkdirSync(OUT_DIR, { recursive: true })
mkdirSync(resolve(process.cwd(), 'src/generated'), { recursive: true })

const sources = collect(SOURCE_DIR).sort()
const manifest = {}
let written = 0
let skipped = 0

for (const sourcePath of sources) {
  // Key is the POSIX-style relative path without extension, so it can be
  // dropped straight into a URL on any platform.
  const rel = relative(SOURCE_DIR, sourcePath).split(sep).join('/')
  const key = rel.slice(0, rel.length - extname(rel).length)
  const sourceStat = statSync(sourcePath)

  const { width: intrinsicWidth, height: intrinsicHeight } = await sharp(sourcePath).metadata()

  // Never upscale: a 900px original gains nothing from a 2400px variant.
  const widths = WIDTHS.filter((w) => w <= intrinsicWidth)
  if (widths.length === 0) widths.push(intrinsicWidth)

  for (const width of widths) {
    const outPath = join(OUT_DIR, `${key}-${width}.webp`)
    if (existsSync(outPath) && statSync(outPath).mtimeMs >= sourceStat.mtimeMs) {
      skipped += 1
      continue
    }
    mkdirSync(dirname(outPath), { recursive: true })
    await sharp(sourcePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath)
    written += 1
  }

  manifest[key] = { width: intrinsicWidth, height: intrinsicHeight, widths }
}

writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(
  `images: ${sources.length} source(s), ${written} variant(s) written, ${skipped} up to date`,
)
