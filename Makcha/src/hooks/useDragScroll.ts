import { useRef, useEffect, useCallback } from "react";

export const useDragScroll = () => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const dragMoved = useRef(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const updateIndicator = useCallback(() => {
    const el = scrollerRef.current;
    const ind = indicatorRef.current;
    if (!el || !ind) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const scrollRatio = clientWidth / scrollWidth;
    const indWidth = Math.max(clientWidth * scrollRatio, 30);
    const maxScrollLeft = scrollWidth - clientWidth;
    const progress = maxScrollLeft > 0 ? scrollLeft / maxScrollLeft : 0;
    
    ind.style.width = `${indWidth}px`;
    ind.style.transform = `translateX(${(clientWidth - indWidth) * progress}px)`;
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouch) {
      const handleMouseDown = (e: MouseEvent) => {
        isDragging.current = true;
        dragMoved.current = false;
        dragStart.current = { x: e.pageX - el.getBoundingClientRect().left, scrollLeft: el.scrollLeft };
        el.style.cursor = 'grabbing';
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;
        const x = e.pageX - el.getBoundingClientRect().left;
        const walk = (x - dragStart.current.x) * 1.5;
        if (Math.abs(walk) > 5) dragMoved.current = true;
        el.scrollLeft = dragStart.current.scrollLeft - walk;
        updateIndicator();
      };

      const handleMouseUp = () => {
        isDragging.current = false;
        el.style.cursor = 'grab';
      };

      const handleWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
        e.preventDefault();
        el.scrollLeft += e.deltaY;
        updateIndicator();
      };

      el.addEventListener("mousedown", handleMouseDown);
      el.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("resize", updateIndicator);
        el.removeEventListener("mousedown", handleMouseDown);
        el.removeEventListener("wheel", handleWheel);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }

    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  return { scrollerRef, indicatorRef, onScroll: updateIndicator, getDragMoved: () => dragMoved.current };
};