import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// En GitHub Pages la web vive en /Automatizaciones/.
// Si se publica en un dominio propio, cambia BASE_PATH a '/'.
const BASE_PATH = process.env.BASE_PATH ?? '/'

// https://vite.dev/config/
export default defineConfig({
  base: BASE_PATH,
  plugins: [react()],
})
