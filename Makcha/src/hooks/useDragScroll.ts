import { useState, useRef, useEffect, useCallback } from "react";

export const useDragScroll = () => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragMoved, setDragMoved] = useState(false);

  // 드래그 계산용 값 (리렌더링 방지)
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  // 인디케이터 위치 계산
  const updateIndicator = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    
    const scrollRatio = clientWidth / scrollWidth;
    const indWidth = Math.max(clientWidth * scrollRatio, 30);
    const maxScrollLeft = scrollWidth - clientWidth;
    const progress = maxScrollLeft > 0 ? scrollLeft / maxScrollLeft : 0;
    
    setIndicator({ left: (clientWidth - indWidth) * progress, width: indWidth });
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollerRef.current;
    if (!el) return;

    setIsDragging(true);
    setDragMoved(false);
    dragStart.current = {
      x: e.pageX - el.getBoundingClientRect().left,
      scrollLeft: el.scrollLeft,
    };
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      // 텍스트 선택 방지
      document.body.style.userSelect = 'none';
      
      const x = e.pageX - el.getBoundingClientRect().left;
      const walk = (x - dragStart.current.x) * 1.5;
      
      if (Math.abs(walk) > 5) setDragMoved(true);
      el.scrollLeft = dragStart.current.scrollLeft - walk;
      updateIndicator();
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // 텍스트 선택 방지 해제
      document.body.style.userSelect = '';
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
      updateIndicator();
    };

    // 이벤트 등록
    el.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("resize", updateIndicator);
    updateIndicator();

    return () => {
      el.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", updateIndicator);
      document.body.style.userSelect = ''; // 언마운트 시 초기화
    };
  }, [isDragging, updateIndicator]);

  return {
    scrollerRef,
    indicator,
    onMouseDown,
    isDragging,
    dragMoved,
    onScroll: updateIndicator,
  };
};