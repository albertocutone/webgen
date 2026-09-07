import { test, expect } from '@playwright/test'
import { VISUAL_ROUTES } from './routes.js'

test.describe('smoke', () => {
  test('the app mounts with no console errors', async ({ page }) => {
    const errors = []
    page.on('pageerror', (e) => errors.push(e.message))

    await page.goto('/')

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Masseria Mastrangelo')
    expect(errors).toEqual([])
  })

  test('styles are applied, not just markup', async ({ page }) => {
    await page.goto('/')

    // If Tailwind failed to load, the body keeps the UA default white.
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
    expect(bg).toBe('rgb(250, 248, 244)') // --color-limestone-50
  })

  for (const { path, name } of VISUAL_ROUTES) {
    test(`${name} loads directly with exactly one h1`, async ({ page }) => {
      await page.goto(path)
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
    })

    // The header's nowrap labels cannot shrink, so a too-narrow container
    // silently pushes content past the viewport. Nothing should scroll
    // sideways at any supported width.
    test(`${name} has no horizontal overflow`, async ({ page }) => {
      await page.goto(path)
      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }))
      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth)
    })
  }

  test('an unknown path renders the 404 page', async ({ page }) => {
    await page.goto('/nessuna-pagina-qui')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pagina non trovata')
  })
})

/**
 * Below Tailwind's `sm` (640px) the header cannot fit logo + toggle + CTA +
 * hamburger, so the language switch lives inside the overlay menu instead.
 * Auto-detection from navigator.language means the toggle is only ever an
 * override, so burying it there is acceptable.
 */
async function switchLanguage(page, isMobile, language) {
  if (isMobile) {
    await page.getByRole('button', { name: 'Apri il menu' }).click()
    await page.getByTestId('language-menu').getByRole('button', { name: language }).click()
    return
  }
  await page.getByTestId('language-header').getByRole('button', { name: language }).click()
}

test.describe('locale', () => {
  test('renders Italian by default and switches to English', async ({ page, isMobile }) => {
    await page.goto('/chi-siamo')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Chi Siamo')
    await expect(page.locator('html')).toHaveAttribute('lang', 'it')

    await switchLanguage(page, isMobile, 'English')

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('About Us')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  })

  test('remembers the language across a reload', async ({ page, isMobile }) => {
    await page.goto('/')
    await switchLanguage(page, isMobile, 'English')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')

    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  })
})

test.describe('mobile navigation', () => {
  test.skip(({ isMobile }) => !isMobile, 'overlay menu only exists below xl')

  test('opens the overlay and navigates', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Apri il menu' }).click()
    await page.getByRole('link', { name: 'Territorio' }).first().click()

    await expect(page).toHaveURL(/\/territorio$/)
    await expect(page.getByRole('button', { name: 'Apri il menu' })).toBeVisible()
  })
})

test.describe('navigation', () => {
  test('the Book Now CTA reaches the enquiry page', async ({ page }) => {
    await page.goto('/')
    await page
      .getByRole('link', { name: /Prenota Ora|Book Now/ })
      .first()
      .click()
    await expect(page).toHaveURL(/\/contatti$/)
  })
})
test.describe('header layout', () => {
  // scrollWidth <= clientWidth does not catch elements colliding inside a
  // flex row: adding the logo made the CTA paint straight over the wordmark
  // at 390px while the document itself never overflowed.
  test('header controls never overlap each other', async ({ page }) => {
    await page.goto('/')

    const boxes = []
    for (const locator of [
      page.getByRole('banner').getByRole('link').first(),
      page.getByRole('link', { name: /Prenota Ora|Book Now/ }).first(),
    ]) {
      boxes.push(await locator.boundingBox())
    }

    const [brand, cta] = boxes
    expect(brand).not.toBeNull()
    expect(cta).not.toBeNull()
    // Horizontal separation: the brand must end before the CTA begins.
    expect(brand.x + brand.width).toBeLessThanOrEqual(cta.x + 1)
  })
})
