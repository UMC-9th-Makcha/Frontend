import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      devOptions: {
        enabled: true // 개발 환경(localhost/ngrok)에서도 PWA 작동 허용
      },
      manifest: {
        name: 'Makcha',
        short_name: 'Makcha',
        description: '막차 알림 서비스',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'makcha.png', // public 폴더 기준 경로
            sizes: '192x192',
            type: 'image/png'   // PNG이므로 image/png로 변경
          },
          {
            src: 'makcha.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // 💡 안드로이드에서 아이콘이 꽉 차게 보이게 해줍니다.
          }
        ]
      }
        ]
      }
    })
  ],
  server: {
    allowedHosts: true, 
    host: true,
  },
})