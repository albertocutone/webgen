import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // Third arg '' loads every var, not just VITE_-prefixed ones, so BASE_PATH
  // can also come from a .env file.
  const env = loadEnv(mode, process.cwd(), '')

  // The site is served from https://<user>.github.io/webgen/, so every asset
  // URL must be prefixed with the repository name. Overridable via BASE_PATH
  // so a custom domain (served from /) needs no code change.
  const base = process.env.BASE_PATH ?? env.BASE_PATH ?? '/webgen/'

  return {
    base,
    plugins: [react(), tailwindcss()],
    // Injected as plain globals rather than import.meta.env so the same module
    // is readable by Jest; see src/lib/config.js.
    define: {
      __WEB3FORMS_KEY__: JSON.stringify(env.VITE_WEB3FORMS_KEY ?? ''),
      __TURNSTILE_SITE_KEY__: JSON.stringify(env.VITE_TURNSTILE_SITE_KEY ?? ''),
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
  }
})
