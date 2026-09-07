import { test, expect } from '@playwright/test'
import { ROUTES } from '../../src/routes.js'
import { buildMeta } from '../../src/lib/seo.js'

/**
 * Runs with JavaScript disabled, standing in for the crawlers and social
 * scrapers that do not execute scripts. Without prerendering every one of
 * these assertions fails against an empty <div id="root">, which is precisely
 * the SEO failure mode design §7 calls out.
 */
test.describe('prerendered HTML (no JavaScript)', () => {
  for (const route of ROUTES) {
    test(`${route.id} serves real content and metadata`, async ({ page }) => {
      await page.goto(route.path)

      const { title, description } = buildMeta(route.id, 'it')

      await expect(page).toHaveTitle(title)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.locator('h1')).not.toBeEmpty()
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', description)
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1)
    })
  }

  test('the home page exposes LodgingBusiness structured data', async ({ page }) => {
    await page.goto('/')
    const ld = await page.locator('script[type="application/ld+json"]').textContent()
    expect(JSON.parse(ld)['@type']).toBe('LodgingBusiness')
  })

  test('navigation links are crawlable anchors', async ({ page }) => {
    await page.goto('/')
    for (const route of ROUTES.filter((r) => r.inNav)) {
      await expect(page.locator(`a[href="${route.path}"]`).first()).toHaveCount(1)
    }
  })

  test('FAQ answers are readable without opening the accordion', async ({ page }) => {
    await page.goto('/')
    // Text inside a collapsed <details> is still in the document.
    await expect(page.locator('dd').first()).not.toBeEmpty()
  })
  test('content is visible, not just present, without JS', async ({ page }) => {
    await page.goto('/')
    // A page transition that starts at opacity 0 would be baked into the
    // prerendered HTML and hide everything from non-executing crawlers.
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('main')).toBeVisible()
  })
})
