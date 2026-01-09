import { useState, useEffect, useCallback } from 'react';

export const usePWAInstall = () => {
  // 설치 권한을 상태로 관리
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(
    () => window.deferredPrompt || null
  );

  useEffect(() => {
    // 브라우저로부터 "이 앱 설치 가능하다"는 신호를 받았을 때
    const onReadyToInstall = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setInstallEvent(promptEvent);
      window.deferredPrompt = promptEvent;
    };

    // 사용자가 실제로 설치를 완료했을 때
    const onInstallFinished = () => {
      setInstallEvent(null);
      window.deferredPrompt = null;
    };

    window.addEventListener('beforeinstallprompt', onReadyToInstall);
    window.addEventListener('appinstalled', onInstallFinished);

    return () => {
      window.removeEventListener('beforeinstallprompt', onReadyToInstall);
      window.removeEventListener('appinstalled', onInstallFinished);
    };
  }, []);

  // 실제 설치 팝업
  const install = useCallback(async () => {
    const prompt = installEvent || window.deferredPrompt;
    if (!prompt) return;

    await prompt.prompt();
    await prompt.userChoice;
    
    // 설치 시도 후 상태 초기화
    setInstallEvent(null);
    window.deferredPrompt = null;
  }, [installEvent]);

  return {
    canInstall: !!(installEvent || window.deferredPrompt), // 설치 가능 상태인가?
    install // 설치 시작하기
  };
};