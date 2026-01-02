import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/establishing_a_high_tech_crime_response_system/',
  plugins: [react(),tailwindcss(),],
})
