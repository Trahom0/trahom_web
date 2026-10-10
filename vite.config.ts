import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ isSsrBuild: ssrFlag }) => {
  const isSsrBuild = Boolean(ssrFlag || process.argv.includes('--ssr'));
  return {
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
    build: {
      // The server-side bundle is only used at build time, so keep it out of the published folder.
      outDir: isSsrBuild ? 'dist-ssr' : 'dist',
      emptyOutDir: true,
    },
  };
})
