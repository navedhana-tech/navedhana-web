import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Ensure proper static asset handling
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
