import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: '/beheer',
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      // Support for absolute imports from src/
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: true,
    open: '/beheer',
    proxy: {
      '/': {
        target: 'https://ontw.app.amsterdam.nl',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
