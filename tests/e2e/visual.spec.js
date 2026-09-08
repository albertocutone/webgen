import { test } from '@playwright/test'
import { VISUAL_ROUTES } from './routes.js'

// Not assertions — this spec exists to publish screenshots as a CI artifact so
// rendering can be reviewed by eye. The development machine cannot run
// Playwright browsers (endpoint security kills them), so CI is the only place
// the rendered page can actually be looked at.
//
// Captured with reduced motion emulated. Scroll reveals are driven by
// IntersectionObserver, which never fires for content below the fold in a page
// that was never scrolled: the first screenshots after adding reveals showed
// the home page as a hero above a large blank area. Reveal already opts out
// entirely under prefers-reduced-motion, so emulating it gives fully settled,
// fully visible content with no mid-animation frames — deterministic review
// shots, using a code path the site genuinely has rather than a test-only one.
test.use({ reducedMotion: 'reduce' })

test.describe('visual review', () => {
  for (const { path, name } of VISUAL_ROUTES) {
    test(`capture ${name}`, async ({ page }, testInfo) => {
      await page.goto(path)
      await page.waitForLoadState('networkidle')

      await page.screenshot({
        path: `screenshots/${testInfo.project.name}-${name}.png`,
        fullPage: true,
      })
    })
  }
})
