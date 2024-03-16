import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  // Your configuration
  optimizeDeps: {
    // Add both @codemirror/state and @codemirror/view to included deps to optimize
    include: ['@codemirror/state', '@codemirror/view'],
  }
})


