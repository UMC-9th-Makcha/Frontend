/// <reference lib="webworker" />
import { precacheAndRoute } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST || []);

const handleWindowAction = async (targetUrl: string) => {
  const windowClients = await self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  });

  // 웹이 이미 열려있는지 확인
  const existingClient = windowClients.find((client) =>
    client.url.startsWith(self.registration.scope)
  ) as WindowClient | undefined;

  if (existingClient) {
    // 이미 창이 있다면 해당 탭으로 이동 후 포커스
    await existingClient.navigate(targetUrl);
    return existingClient.focus();
  }

  // 창이 없다면 새로 열기
  if (self.clients.openWindow) {
    return self.clients.openWindow(targetUrl);
  }
};

// 알림 클릭 이벤트
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  // '닫기' 버튼 클릭 시 조기 리턴
  if (event.action === 'close') return;

  const urlToOpen = new URL(
    event.notification.data?.url || '/', 
    self.location.origin
  ).href;

  event.waitUntil(handleWindowAction(urlToOpen));
});


self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));