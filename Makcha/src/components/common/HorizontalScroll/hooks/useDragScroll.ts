import { useRef, useEffect, useCallback, useMemo } from "react";

export const useDragScroll = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  const state = useRef({
    isDragging: false,
    startX: 0,
    startLeft: 0,
    moved: false,
  });

  const syncIndicator = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      const el = scrollerRef.current;
      const ind = indicatorRef.current;
      if (!el || !ind) return;

      const { scrollLeft, scrollWidth, clientWidth } = el;
      const maxScroll = scrollWidth - clientWidth;
      
      if (maxScroll <= 0) {
        ind.style.display = 'none';
        return;
      }

      ind.style.display = 'block';
      const ratio = clientWidth / scrollWidth;
      const progress = scrollLeft / maxScroll;
      const indWidth = clientWidth * ratio;

      ind.style.width = `${indWidth}px`;
      ind.style.transform = `translateX(${(clientWidth - indWidth) * progress}px)`;
    });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    syncIndicator();

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        if (e.button !== 0) return;
        state.current.isDragging = true;
        state.current.startX = e.pageX;
        state.current.startLeft = el.scrollLeft;
        el.style.scrollBehavior = "auto";
        el.style.cursor = "grabbing";
      }
      state.current.moved = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (state.current.isDragging && e.pointerType === 'mouse') {
        const walk = (e.pageX - state.current.startX) * 1.5;
        if (Math.abs(walk) > 5) state.current.moved = true;
        el.scrollLeft = state.current.startLeft - walk;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        state.current.isDragging = false;
        el.style.cursor = "grab";
        el.style.scrollBehavior = "";
      }
    };

    // 휠 동작
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        const isScrollable = el.scrollWidth > el.clientWidth;
        if (isScrollable) {
          e.preventDefault();
          el.scrollLeft += e.deltaY;
        }
      }
    };

    const onTouchMove = () => {
      state.current.moved = true;
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    
    // 중요: preventDefault를 쓰려면 passive: false여야 함
    el.addEventListener("wheel", onWheel, { passive: false });
    
    el.addEventListener("scroll", syncIndicator, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });

    const resizeObserver = new ResizeObserver(syncIndicator);
    resizeObserver.observe(el);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("wheel", onWheel); // cleanup
      el.removeEventListener("scroll", syncIndicator);
      el.removeEventListener("touchmove", onTouchMove);
      resizeObserver.disconnect();
    };
  }, [syncIndicator]);

  const withDragCheck = useCallback((callback: (moved: boolean) => void) => () => {
    if (state.current.moved) return;
    callback(false);
  }, []);

  const containerProps = useMemo(() => ({
    ref: scrollerRef,
    style: {
      touchAction: 'pan-x pan-y' as const, 
      overflowX: 'auto' as const,
      WebkitOverflowScrolling: 'touch' as const,
      userSelect: 'none' as const,
      cursor: 'grab',
    }
  }), []);

  const indicatorProps = useMemo(() => ({
    ref: indicatorRef,
    style: { 
      willChange: 'transform, width' as const,
      pointerEvents: 'none' as const 
    }
  }), []);

  return { containerProps, indicatorProps, withDragCheck };
};