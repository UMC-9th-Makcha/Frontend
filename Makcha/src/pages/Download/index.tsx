import { useEffect } from 'react';

export default function Download() {
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
    });
  }, []);

  // 5초 뒤 알림
  const handleNotifyWith5SecDelay = async () => {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      setTimeout(async () => {
        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.ready;
          
          await registration.showNotification("🚌 막차 알림", {
            body: "설정하신 막차 시간이 5분 남았습니다!",
            icon: "/vite.svg",
            badge: "/vite.svg",
            vibrate: [200, 100, 200],
            tag: "makcha-delay-alert"
          });
        }
      }, 5000);
    }
  };

  return (
    <div className="p-6 text-center space-y-8">
      <div className="pt-12">
        <div className="w-24 h-24 bg-makcha-yellow-500 rounded-3xl mx-auto mb-4 flex items-center justify-center text-4xl">🚌</div>
        <h1 className="text-2xl font-bold">막차 알림 테스트</h1>
        <p className="text-makcha-navy-400 mt-2 text-sm">버튼을 누르고 5초 뒤에 알림이 옵니다.</p>
      </div>

      <button 
        onClick={handleNotifyWith5SecDelay}
        className="w-full py-4 bg-makcha-navy-900 text-white font-bold rounded-2xl active:scale-95 transition-transform"
      >
        5초 뒤 알림 받기
      </button>
    </div>
  );
}