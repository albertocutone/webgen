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

      await page.screenshot({
        path: `screenshots/${testInfo.project.name}-${name}.png`,
        fullPage: true,
      })
    })
  }
})
