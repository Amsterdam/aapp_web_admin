import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

export default defineConfig({
  base: '/beheer',
  plugins: [react()],
  build: {
    outDir: 'build',
    emptyOutDir: true,
  },
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
    strictPort: true,
    open: '/beheer',
    proxy: {
      '^/(?!beheer(?:/|$)).*': {
        target: 'https://ontw.app.amsterdam.nl',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
