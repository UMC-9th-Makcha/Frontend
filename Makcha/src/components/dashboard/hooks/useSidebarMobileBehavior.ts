import { useEffect } from 'react';

export const useSidebarMobileBehavior = (
  isMobile: boolean, 
  isOpen: boolean, 
  setOpen: (val: boolean) => void
) => {
  useEffect(() => {
    if (!isMobile || !isOpen) {
      document.body.style.overflow = 'unset';
      document.body.style.overscrollBehaviorY = 'auto';
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const originalOverscroll = document.body.style.overscrollBehaviorY;
    
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehaviorY = 'none';

    if (window.history.state?.sidebar !== 'open') {
      window.history.pushState({ sidebar: 'open' }, '');
    }

    const handlePopState = () => {
      if (isOpen) {
        setOpen(false);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      
      document.body.style.overflow = originalOverflow || 'unset';
      document.body.style.overscrollBehaviorY = originalOverscroll || 'auto';

      if (window.history.state?.sidebar === 'open') {
        window.history.back();
      }
    };
  }, [isMobile, isOpen, setOpen]);
};