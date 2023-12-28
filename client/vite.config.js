import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// front end port supported by vite/react
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'https://recipedb-ug34.onrender.com',
        secure: false,
        changeOrigin: true,
      }
    }
  }
})
