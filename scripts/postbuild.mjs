// GitHub Pages serves static files only: a deep link such as /webgen/appartamenti
// has no matching file and returns the 404 page. Shipping a 404.html that is a
// byte-copy of index.html makes Pages hand the request to the SPA, which then
// resolves the route client-side. See design doc section 5.2.
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve(process.cwd(), 'dist')
const index = resolve(dist, 'index.html')
const notFound = resolve(dist, '404.html')

if (!existsSync(index)) {
  console.error('postbuild: dist/index.html not found — did vite build run?')
  process.exit(1)
}

copyFileSync(index, notFound)
console.log('postbuild: wrote dist/404.html (SPA fallback)')
