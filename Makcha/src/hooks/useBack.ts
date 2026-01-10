import { useEffect } from "react";
import type { ViewType } from "../pages/Setting/constants";

export const useBack = (view: ViewType, onBack: () => void) => {
  useEffect(() => {
    if (view === 'MAIN') return;

    window.history.pushState(null, '', '');

    const handlePopState = (event: PopStateEvent) => {
      onBack();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [view, onBack]);
};