import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import viteTsconfigPaths from "vite-tsconfig-paths"
import svgrPlugin from "vite-plugin-svgr"
import viteCompression from "vite-plugin-compression"
import { chunkSplitPlugin } from "vite-plugin-chunk-split"
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/notion",
  server: {
    open: true,
    port: 3000,
  },
  build: {
    outDir: "build",
    sourcemap: false,
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:js|css|html|png|jpg|svg|ico|avif|wasm|onnx|woff|woff2)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "notion-static-cache",
            },
          },
        ],
      },
      manifestFilename: "manifest.json",
      manifest: {
        short_name: "notion-widgets",
        name: "notion-widgets",
        description: "notion widgets",
        id: "/",
        start_url: "/",
        scope: "/",
        display: "standalone",
        display_override: ["standalone", "window-controls-overlay", "minimal-ui"],
        theme_color: "#f1f2f5",
        background_color: "#f1f2f5",
        orientation: "portrait",
        icons: [
          {
            src: "./launcher-icon-1x.png",
            sizes: "48x48",
            type: "image/png",
            purpose: "monochrome maskable",
          },
          {
            src: "./launcher-icon-2x.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "monochrome maskable",
          },
          {
            src: "./launcher-icon-3x.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "./launcher-icon-4x.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "monochrome maskable",
          },
          {
            src: "./launcher-icon-10x.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "monochrome maskable",
          },
          {
            src: "./launcher-icon-20x.png",
            sizes: "1024x1024",
            type: "image/png",
            purpose: "monochrome maskable",
          },
        ],
      },
    }),
    chunkSplitPlugin({
      strategy: "single-vendor",
      customSplitting: {
        ui: [/@mui\/material/],
      },
    }),
    viteCompression({
      filter: /\.(js|mjs|json|css|html)$/i,
      algorithm: "brotliCompress",
      threshold: 100,
    }),
  ],
})
