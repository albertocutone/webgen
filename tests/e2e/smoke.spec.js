import { test, expect } from '@playwright/test'

test.describe('smoke', () => {
  test('the app mounts and renders the venue name', async ({ page }) => {
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
})
