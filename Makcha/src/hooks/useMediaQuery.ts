import { useSyncExternalStore } from 'react';

export function useMediaQuery(query: string) {

  const subscribe = (callback: () => void) => {
    const matchMedia = window.matchMedia(query);
    matchMedia.addEventListener('change', callback);
    return () => matchMedia.removeEventListener('change', callback);
  };

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => {
    return false;
  };

  // React 18 공식 훅 사용
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}