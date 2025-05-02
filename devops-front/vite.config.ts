import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true, // чтобы не импортировать describe/it/expect каждый раз
    setupFiles: './src/setupTests.ts', // если хочешь подключить jest-dom и др.
  },
})
