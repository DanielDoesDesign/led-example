import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        // 'node_modules/paperjs-offset/demo/paperjs-offset.js'
      ]
      // https://rollupjs.org/guide/en/#big-list-of-options
    }

  }
})


