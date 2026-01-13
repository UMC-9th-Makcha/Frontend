import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'

// 개발 환경에서는 PWA Service Worker 등록하지 않기
if (import.meta.env.PROD) {
  const { registerSW } = await import("virtual:pwa-register");
  registerSW({ immediate: true });
}

createRoot(document.getElementById('root')!).render(
  <App />,
)
