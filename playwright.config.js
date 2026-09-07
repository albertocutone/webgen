import { defineConfig, devices } from '@playwright/test'

// E2E runs against the production build served by `vite preview`, not the dev
// server, so we test the artifact that actually ships (design doc section 9).
// BASE_PATH is emptied for preview so routes sit at / rather than /webgen/,
// which keeps the specs free of deployment-path details.
const PORT = 4173
const baseURL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],

  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // Pinned: the app picks its locale from navigator.language, so an
    // en-US runner would silently render the English site and make any
    // Italian assertion locale-dependent. Italian is the primary audience.
    locale: 'it-IT',
  },

  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] }, testIgnore: /nojs\.spec\.js/ },
    { name: 'mobile', use: { ...devices['iPhone 13'] }, testIgnore: /nojs\.spec\.js/ },
    // Approximates a crawler that does not execute JavaScript, which is the
    // whole point of prerendering (design §7).
    {
      name: 'nojs',
      testMatch: /nojs\.spec\.js/,
      use: { ...devices['Desktop Chrome'], javaScriptEnabled: false },
    },
  ],

  webServer: {
    command: `npm run build && npx vite preview --port ${PORT} --strictPort`,
    // Must be passed via env, not as a `VAR=x cmd1 && cmd2` prefix — that form
    // scopes the variable to cmd1 only, leaving preview serving under /webgen/
    // while the specs request /.
    env: { BASE_PATH: '/' },
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
