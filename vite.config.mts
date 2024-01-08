import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/notion",
  server: {
    open: true,
    port: 3000,
  },
  build: {
    outDir: 'build',
    sourcemap: false,
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
    viteCompression({
      algorithm: "brotliCompress"
    })
  ]
})
