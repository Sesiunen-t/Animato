import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },

  plugins: [react(), mkcert(),
    VitePWA({
      manifest: {
        short_name: "app",
        name: "Out awsome app",
        icons: [
          {
            src: "favicon.ico",
            sizes: "32x32 16x16",
            type: "image/x-icon",
          },
          {
            src: "pwa-192x192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "pwa-512x512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#ffcd29",
        background_color: "#ffffff",
      },
      registerType: "autoUpdate",
    }),
  ],
})
