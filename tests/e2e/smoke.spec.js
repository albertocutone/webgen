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
  }

  test('an unknown path renders the 404 page', async ({ page }) => {
    await page.goto('/nessuna-pagina-qui')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pagina non trovata')
  })
})

test.describe('locale', () => {
  test('renders Italian by default and switches to English', async ({ page }) => {
    await page.goto('/chi-siamo')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Chi Siamo')
    await expect(page.locator('html')).toHaveAttribute('lang', 'it')

    await page.getByRole('button', { name: 'English' }).first().click()

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('About Us')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  })

  test('remembers the language across a reload', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'English' }).first().click()
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
