import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static-suitable build, hashed asset names for stable hosting.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    target: 'es2020',
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: false,
  },
})