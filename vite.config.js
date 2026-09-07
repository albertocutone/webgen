import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The site is served from https://<user>.github.io/webgen/, so every asset URL
// must be prefixed with the repository name. Overridable via BASE_PATH so a
// custom domain (served from /) needs no code change.
const base = process.env.BASE_PATH ?? '/webgen/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
