import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/TPS-Controls/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
}))
