import { useCallback } from 'react';

export default function History() {
  const handleNotifyTest = useCallback(async () => {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      alert('3초 뒤 알림이 옵니다. 앱을 끄고 기다려보세요!');

      setTimeout(async () => {
        const reg = await navigator.serviceWorker.ready;
        
        reg.showNotification("🚌 막차 확인 완료", {
          body: "설정한 [9401번] 막차가 10분 뒤 도착합니다!",
          icon: "/makcha.png",
          badge: "/makcha.png",
          vibrate: [200, 100, 200], // 진동
          tag: "makcha-status",          
          // 알림 버튼 설정
          actions: [
            { action: 'check', title: '버스 위치 확인' },
            { action: 'close', title: '닫기' }
          ],
          // 클릭 시 이동할 url
          data: {
            url: '/home' 
          }
        });
      }, 3000);
    }
  }, []);

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <h1 className="text-2xl font-bold dark:text-white">알림 테스트</h1>
      <button
        onClick={handleNotifyTest}
        className="w-full max-w-xs py-4 bg-makcha-navy-900 dark:bg-makcha-yellow-500 text-white dark:text-makcha-navy-900 font-bold rounded-2xl shadow-lg"
      >
        3초 뒤 알림 받기
      </button>
    </div>
  );
}