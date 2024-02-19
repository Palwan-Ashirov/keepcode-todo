import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3001,
    host: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@use': path.resolve(__dirname, './src/composables')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/assets/scss/_variables.scss" as *;'
      }
    }
  }
})
