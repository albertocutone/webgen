import { test } from '@playwright/test'
import { VISUAL_ROUTES } from './routes.js'

// Not assertions — this spec exists to publish screenshots as a CI artifact so
// rendering can be reviewed by eye. The development machine cannot run
// Playwright browsers (endpoint security kills them), so CI is the only place
// the rendered page can actually be looked at.
test.describe('visual review', () => {
  for (const { path, name } of VISUAL_ROUTES) {
    test(`capture ${name}`, async ({ page }, testInfo) => {
      await page.goto(path)
      await page.waitForLoadState('networkidle')

      // Scroll the whole page before capturing. Scroll reveals are driven by
      // IntersectionObserver, which never fires for content below the fold in
      // a page that was never scrolled — a fullPage screenshot would then show
      // those sections still at opacity 0 and the review would be worthless.
      await page.evaluate(async () => {
        const step = window.innerHeight * 0.8
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y)
          await new Promise((r) => setTimeout(r, 60))
        }
        window.scrollTo(0, 0)
        await new Promise((r) => setTimeout(r, 400))
      })

      // Let the reveal transitions finish so nothing is caught mid-fade.
      await page.waitForFunction(() => !document.querySelector('[data-reveal="hidden"]'), null, {
        timeout: 5000,
      })
      await page.waitForTimeout(700)

      await page.screenshot({
        path: `screenshots/${testInfo.project.name}-${name}.png`,
        fullPage: true,
      })
    })
  }
})
