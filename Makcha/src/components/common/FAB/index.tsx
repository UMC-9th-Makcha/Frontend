import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useMediaQuery } from '../../../hooks/useMediaQuery'; // 경로 확인 필요

export default function FAB() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fabRef = useRef<HTMLDivElement>(null);
  const dragInfo = useRef({
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
    hasMoved: false,
    rafId: 0,
  });

  const MOBILE_NAV_HEIGHT = 64;
  const FAB_SIZE = 48;

  // 드래그 시작
  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if ('button' in e && e.button !== 0) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const rect = fabRef.current?.getBoundingClientRect();
    const currentLeft = rect?.left ?? 0;
    const currentTop = rect?.top ?? 0;

    dragInfo.current = {
      startX: clientX,
      startY: clientY,
      offsetX: clientX - currentLeft,
      offsetY: clientY - currentTop,
      hasMoved: false,
      rafId: 0,
    };

    setIsDragging(true);
  };

  // 드래그 중
  const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (dragInfo.current.rafId) cancelAnimationFrame(dragInfo.current.rafId);

    dragInfo.current.rafId = requestAnimationFrame(() => {
      const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;

      const { startX, startY, offsetX, offsetY } = dragInfo.current;

      const moveDist = Math.abs(clientX - startX) + Math.abs(clientY - startY);
      if (moveDist > 5) dragInfo.current.hasMoved = true;

      let newX = clientX - offsetX;
      let newY = clientY - offsetY;

      const bottomLimit = isMobile 
        ? window.innerHeight - MOBILE_NAV_HEIGHT - FAB_SIZE - 10 
        : window.innerHeight - FAB_SIZE - 24;

      newX = Math.max(10, Math.min(newX, window.innerWidth - FAB_SIZE - 10));
      newY = Math.max(10, Math.min(newY, bottomLimit));

      if (fabRef.current) {
        fabRef.current.style.left = `${newX}px`;
        fabRef.current.style.top = `${newY}px`;
        fabRef.current.style.bottom = 'auto';
        fabRef.current.style.right = 'auto';
      }
    });
  }, [isMobile]);

  // 드래그 종료
  const handleEnd = useCallback(() => {

    setIsDragging(false);
    
    if (dragInfo.current.rafId) cancelAnimationFrame(dragInfo.current.rafId);

    if (!dragInfo.current.hasMoved) {
      window.open('https://pf.kakao.com/_DxmVgn', '_blank', 'noopener,noreferrer');
    } else {
      if (fabRef.current) {
        const rect = fabRef.current.getBoundingClientRect();
        setPosition({ x: rect.left, y: rect.top });
      }
    }
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  return (
    <div
      ref={fabRef}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      style={
        position
          ? { left: `${position.x}px`, top: `${position.y}px`, touchAction: 'none' }
          : isMobile
            ? { right: '24px', bottom: '80px', touchAction: 'none' }
            : { right: '24px', bottom: '24px', touchAction: 'none' }
      }
      className={`
        fixed z-50 flex cursor-pointer items-center justify-center overflow-hidden shadow-2xl
        h-12 w-12 rounded-full 
        bg-white dark:bg-makcha-navy-700
        active:scale-95 transition-transform duration-200
        ${!position ? 'absolute' : ''} 
        ${isDragging ? 'scale-110 opacity-90' : 'scale-100 opacity-100'}
      `}
    >
      <img 
        src="/makcha.png" 
        alt="Makcha Logo"
        className="h-full w-full object-cover pointer-events-none" 
        draggable={false}
      />
    </div>
  );
}