import { test, expect } from '@playwright/test'
import { ROUTES } from '../../src/routes.js'
import { buildMeta, buildJsonLd } from '../../src/lib/seo.js'

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

  test('the home page exposes the venue as structured data', async ({ page }) => {
    await page.goto('/')
    const ld = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent())
    // Derived from the source so changing the schema type cannot leave this
    // assertion behind, as it did when LodgingBusiness became BedAndBreakfast.
    const expected = buildJsonLd('it')
    expect(ld['@type']).toBe(expected['@type'])
    expect(ld.address.addressLocality).toBe(expected.address.addressLocality)
    expect(ld.telephone).toBe(expected.telephone)
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
  test('the social preview image is declared and actually resolves', async ({ page, request }) => {
    await page.goto('/')

    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content')
    expect(ogImage).toBeTruthy()

    // The tag pointed at a file that was never generated once; a declared
    // og:image that 404s previews worse than none at all.
    const path = new URL(ogImage).pathname.replace(/^\/webgen/, '')
    const res = await request.get(path)
    expect(res.status()).toBe(200)
    expect(res.headers()['content-type']).toContain('image')
  })

  test('the favicon and apple touch icon resolve', async ({ page, request }) => {
    await page.goto('/')
    for (const sel of ['link[rel="icon"]', 'link[rel="apple-touch-icon"]']) {
      const href = await page.locator(sel).getAttribute('href')
      expect(href).toBeTruthy()
      const res = await request.get(href.replace(/^\/webgen/, ''))
      expect(res.status()).toBe(200)
    }
  })
})
