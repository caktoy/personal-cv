import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the build works at the root of caktoy.github.io or in any subfolder.
export default defineConfig({
  base: './',
  plugins: [react()],
})
