import { useEffect } from "react";
import type { ViewType } from "../constants";

export const useBack = (view: ViewType, onBack: () => void) => {
  useEffect(() => {
    if (view === 'MAIN') return;

    if (window.history.state?.view !== view) {
      window.history.pushState({ view }, '', '');
    }

    const handlePopState = () => {
      onBack();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);

      if (window.history.state?.view === view) {
        window.history.back();
      }
    };
  }, [view, onBack]);
};