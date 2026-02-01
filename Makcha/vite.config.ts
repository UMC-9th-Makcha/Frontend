import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false,
        type: 'module', 
      },
      manifest: {
        name: 'Makcha',
        short_name: 'Makcha',
        description: '막차 시간을 실시간으로 확인하고 알림을 받으세요.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'makcha.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'makcha.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      injectManifest: {
        swDest: 'dist/sw.js',
      }
    }),
  ],
  server: {
    allowedHosts: true,
    host: true,
  },
})