import { useState, useEffect } from 'react';

export default function Download() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // 💡 브라우저가 설치 가능하다고 판단하면 이 이벤트를 발생시킵니다.
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault(); // 기본 팝업 방지
      setDeferredPrompt(e); // 이벤트를 변수에 저장
    });

    // 설치가 완료되면 실행됩니다.
    window.addEventListener('appinstalled', () => {
      setDeferredPrompt(null);
      alert('설치가 완료되었습니다! 홈 화면에서 막차를 확인하세요.');
    });
  }, []);

  // 💡 [설치 버튼 클릭 시 실행]
  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // 설치 프롬프트가 없는 경우 (아이폰이나 이미 설치된 경우)
      alert('아이폰은 사파리 하단의 [공유] -> [홈 화면에 추가]를 눌러주세요!');
      return;
    }

    // 저장해둔 이벤트를 사용하여 설치창을 띄웁니다.
    deferredPrompt.prompt();

    // 사용자의 선택 결과 확인
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('사용자가 설치를 승인했습니다.');
      setDeferredPrompt(null);
    }
  };

  const handleNotifyTest = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setTimeout(async () => {
        const reg = await navigator.serviceWorker.ready;
        reg.showNotification("🚌 막차 알림", { body: "5초 테스트 성공!" });
      }, 5000);
    }
  };

  return (
    <div className="p-6 text-center space-y-8">
      <div className="pt-12">
        <div className="w-24 h-24 bg-makcha-yellow-500 rounded-3xl mx-auto mb-4 flex items-center justify-center text-4xl shadow-lg">🚌</div>
        <h1 className="text-2xl font-bold text-makcha-navy-900">막차 앱 설치하기</h1>
        <p className="text-makcha-navy-400 mt-2 text-sm leading-relaxed">
          앱을 설치하면 탭을 열지 않아도<br /> 
          정확한 시간에 알림을 받을 수 있어요.
        </p>
      </div>

      <div className="space-y-3">
        {/* 설치 버튼 */}
        <button 
          onClick={handleInstallClick}
          className="w-full py-4 bg-white text-makcha-navy-900 font-black rounded-2xl border-2 border-makcha-navy-900 active:scale-95 transition-transform"
        >
          앱 다운로드 (PWA)
        </button>

        {/* 기존 알림 버튼 */}
        <button 
          onClick={handleNotifyTest}
          className="w-full py-4 bg-makcha-navy-900 text-white font-bold rounded-2xl active:scale-95 transition-transform"
        >
          5초 뒤 알림 테스트
        </button>
      </div>
    </div>
  );
}