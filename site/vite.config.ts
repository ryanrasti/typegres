import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'

export default defineConfig({
  plugins: [
    react(),
    vike({
      prerender: true,
      includeAssetsImportedByServer: true
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  optimizeDeps: {
    include: [
      'monaco-editor',
      '@monaco-editor/react',
      '@electric-sql/pglite',
      'framer-motion',
      'lucide-react'
    ]
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: true
  }
})