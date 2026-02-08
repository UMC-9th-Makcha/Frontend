import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

export default function FAB() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fabRef = useRef<HTMLDivElement>(null);
  
  const startPos = useRef({ x: 0, y: 0 });
  const offset = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  const MOBILE_NAV_HEIGHT = 64;
  const FAB_SIZE = 48;

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    hasMoved.current = false;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    startPos.current = { x: clientX, y: clientY };

    const rect = fabRef.current?.getBoundingClientRect();
    if (rect) {
      offset.current = { x: clientX - rect.left, y: clientY - rect.top };
    }
  };

  const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;

    const moveDist = Math.abs(clientX - startPos.current.x) + Math.abs(clientY - startPos.current.y);
    if (moveDist > 5) hasMoved.current = true;

    let newX = clientX - offset.current.x;
    let newY = clientY - offset.current.y;

    const bottomLimit = isMobile 
      ? window.innerHeight - MOBILE_NAV_HEIGHT - FAB_SIZE - 10 
      : window.innerHeight - FAB_SIZE - 24;

    newX = Math.max(10, Math.min(newX, window.innerWidth - FAB_SIZE - 10));
    newY = Math.max(10, Math.min(newY, bottomLimit));

    setPosition({ x: newX, y: newY });
  }, [isDragging, isMobile]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
    if (!hasMoved.current) {
      alert("고객센터 기능을 준비 중입니다!");
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
          : { touchAction: 'none' }
      }
      className={`
        fixed z-48 flex cursor-grab items-center justify-center overflow-hidden shadow-2xl
        h-12 w-12 rounded-full 
        bg-white dark:bg-makcha-navy-700
        active:cursor-grabbing active:scale-95

        ${!position ? (isMobile ? 'right-6 bottom-[80px]' : 'right-6 bottom-6') : ''}
        
        ${isDragging ? 'opacity-90 scale-105 transition-none' : 'opacity-100 transition-transform'}
      `}
    >
      <img 
        src="/makcha.png" 
        alt="Makcha Logo"
        className="h-full w-full object-cover" 
        draggable={false}
      />
    </div>
  );
}