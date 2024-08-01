import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8800',
    },
  },


  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
 
})
