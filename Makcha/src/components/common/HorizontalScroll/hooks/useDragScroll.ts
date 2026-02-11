import { useRef, useEffect, useCallback, useMemo } from "react";

export const useDragScroll = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  // 필요한 리렌더링 방지
  const state = useRef({
    isDragging: false,
    startX: 0,
    startLeft: 0,
    moved: false,
  });

  // 인디케이터 동기화
  const syncIndicator = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      const el = scrollerRef.current;
      const ind = indicatorRef.current;
      if (!el || !ind) return;

      const { scrollLeft, scrollWidth, clientWidth } = el;
      const maxScroll = scrollWidth - clientWidth;

      // 스크롤할 게 없으면 인디케이터 숨김
      if (maxScroll <= 0) {
        ind.style.display = 'none';
        return;
      }

      ind.style.display = 'block';
      
      // 인디케이터 너비 및 위치 계산
      const ratio = clientWidth / scrollWidth;
      // 10% 미만으로 작아지지 않게 최소 너비 보정
      const indWidth = Math.max(clientWidth * ratio, 30); 
      
      const progress = scrollLeft / maxScroll;
      const maxTranslate = clientWidth - indWidth;

      ind.style.width = `${indWidth}px`;
      ind.style.transform = `translateX(${maxTranslate * progress}px)`;
    });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    // 초기화
    syncIndicator();

    // 이벤트 핸들러들
    const onPointerMove = (e: PointerEvent) => {
      if (!state.current.isDragging) return;
      e.preventDefault();

      const x = e.pageX;
      const walk = (x - state.current.startX) * 1.5;

      if (!state.current.moved && Math.abs(walk) > 5) {
        state.current.moved = true;
      }

      el.scrollLeft = state.current.startLeft - walk;
    };

    const onPointerUp = () => {
      state.current.isDragging = false;
      el.style.cursor = "grab";
      el.style.removeProperty("scroll-behavior");

      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    // 드래그 시작
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      state.current.isDragging = true;
      state.current.startX = e.pageX;
      state.current.startLeft = el.scrollLeft;
      state.current.moved = false;

      el.style.scrollBehavior = "auto"; 
      el.style.cursor = "grabbing";

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    };

    // 휠 이벤트
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const isScrollable = el.scrollWidth > el.clientWidth;
        if (isScrollable) {
          e.preventDefault();
          el.scrollLeft += e.deltaY; 
        }
      }
    };

    // 터치 대응
    const onTouchMove = () => {
      state.current.moved = true;
    };

    // 리스너 등록
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", syncIndicator, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });

    // 리사이즈 감지
    const resizeObserver = new ResizeObserver(() => syncIndicator());
    resizeObserver.observe(el);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);

      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", syncIndicator);
      el.removeEventListener("touchmove", onTouchMove);
      resizeObserver.disconnect();
    };
  }, [syncIndicator]);

  // 클릭 이벤트
  const withDragCheck = useCallback((callback: (moved: boolean) => void) => () => {
    if (state.current.moved) {
      return; 
    }
    callback(false);
  }, []);

  // Props
  const containerProps = useMemo(() => ({
    ref: scrollerRef,
    style: {
      touchAction: 'pan-x pan-y',
      overflowX: 'auto' as const,
      WebkitOverflowScrolling: 'touch' as const, 
      userSelect: 'none' as const,
      cursor: 'grab',
    }
  }), []);

  const indicatorProps = useMemo(() => ({
    ref: indicatorRef,
    style: { 
      willChange: 'transform',
      pointerEvents: 'none' as const 
    }
  }), []);

  return { containerProps, indicatorProps, withDragCheck };
};