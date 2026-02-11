import { useState, useEffect, useCallback } from 'react';import useToastStore from '../store/useToastStore';
;

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAWindow extends Window {
  deferredPrompt?: BeforeInstallPromptEvent | null;
}

const isBrowser = typeof window !== 'undefined';
const getPWAWindow = () => (isBrowser ? (window as unknown as PWAWindow) : null);

// Standalone 모드 확인 함수
const getIsStandalone = (): boolean => 
  isBrowser && window.matchMedia('(display-mode: standalone)').matches;

export const usePWAInstall = () => {
  const addToast = useToastStore((state) => state.addToast);

  const [isStandalone, setIsStandalone] = useState<boolean>(getIsStandalone);

  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(() => {
    return getPWAWindow()?.deferredPrompt || null;
  });

  useEffect(() => {
    const pwaWin = getPWAWindow();
    if (!pwaWin) return;

    const onReadyToInstall = (e: Event) => {
      // 브라우저 기본 팝업 방지
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      
      setInstallEvent(promptEvent);
      pwaWin.deferredPrompt = promptEvent;
    };

    const onInstallFinished = () => {
      setInstallEvent(null);
      pwaWin.deferredPrompt = null;
      setIsStandalone(true);
      addToast("앱 설치가 완료되었습니다!", "success");
    };

    window.addEventListener('beforeinstallprompt', onReadyToInstall);
    window.addEventListener('appinstalled', onInstallFinished);

    return () => {
      window.removeEventListener('beforeinstallprompt', onReadyToInstall);
      window.removeEventListener('appinstalled', onInstallFinished);
    };
  }, [addToast]);

  const install = useCallback(async () => {
    const pwaWin = getPWAWindow();
    const prompt = installEvent || pwaWin?.deferredPrompt;
    
    if (!prompt) {
      addToast("설치 가능한 환경이 아니거나 이미 설치되었습니다.", "error");
      return;
    }

    try {
      await prompt.prompt();
      const { outcome } = await prompt.userChoice;
      
      if (outcome !== 'accepted') {
        addToast("설치가 취소되었습니다.", "info");
      }

      setInstallEvent(null);
      if (pwaWin) pwaWin.deferredPrompt = null;
    } catch {
      addToast("설치 중 오류가 발생했습니다.", "error");
    }
  }, [installEvent, addToast]);

  return {
    canInstall: !!(installEvent || getPWAWindow()?.deferredPrompt) && !isStandalone,
    install,
    isStandalone
  };
};