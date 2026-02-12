import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useDragControls, useMotionValue } from "framer-motion";
import type { ReactNode } from "react";

type MobileBottomSheetProps = {
  top: ReactNode;
  children: ReactNode;
  title?: string;
};

export const MobileBottomSheet = ({ top, children, title = "첫차 대기 장소" }: MobileBottomSheetProps) => {
  const CARD_HEIGHT = 96;
  const MID_VISIBLE_COUNT = 2.9;
  const PEEK_HEIGHT = 290;
  const VELOCITY_THRESHOLD = 350;

  const dragControls = useDragControls();
  const sheetRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const y = useMotionValue(0);

  const [snapPoints, setSnapPoints] = useState<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    const recalc = () => {
      const sheetH = sheetRef.current?.clientHeight ?? 0;
      const topH = topRef.current?.clientHeight ?? 0;

      const open = topH - 150;
      const closed = Math.max(0, sheetH - PEEK_HEIGHT);
      const mid = Math.max(open, closed - CARD_HEIGHT * MID_VISIBLE_COUNT);

      setSnapPoints([open, mid, closed]);
    };

    recalc();
    window.addEventListener("resize", recalc);
    window.visualViewport?.addEventListener("resize", recalc);

    return () => {
      window.removeEventListener("resize", recalc);
      window.visualViewport?.removeEventListener("resize", recalc);
    };
  }, [PEEK_HEIGHT]);

  // yOpen/yClosed가 바뀌면 현재 위치를 가장 가까운 스냅으로 정렬 (공백 방지)
  useEffect(() => {
    const current = y.get();
    const nearest = snapPoints.reduce(
      (best, p, i) =>
        Math.abs(current - p) < Math.abs(current - snapPoints[best]) ? i : best, 0) as 0 | 1 | 2;

    y.stop();
    y.set(snapPoints[nearest]);
  }, [snapPoints]);

  const snapTo = (index: 0 | 1 | 2) => {
    const target = snapPoints[index];
    y.stop();
    animate(y, target, {
      type: "spring",
      stiffness: 280,
      damping: 44,
    });
  };

  const handleDragEnd = useCallback(
    (_: any, info: any) => {
      const current = y.get();
      const velocityY = info.velocity.y;
      const [open, mid, closed] = snapPoints;

      //빠른 스와이프 → 방향 우선
      if (Math.abs(velocityY) > VELOCITY_THRESHOLD) {
        if (velocityY < 0) {
          if (current <= mid) { snapTo(0); }
          else { snapTo(1); }
        }
        else {
          if (current >= mid) { snapTo(2); }
          else { snapTo(1); }
        }
        return;
      }
      // 느리게 드래그 → 가장 가까운 스냅
      const nearest = (() => {
        const d0 = Math.abs(current - open);
        const d1 = Math.abs(current - mid);
        const d2 = Math.abs(current - closed);

        if (d0 <= d1 && d0 <= d2) return 0;
        if (d1 <= d2) return 1;
        return 2;
      })();

      snapTo(nearest as 0 | 1 | 2);
    },
    [snapPoints, y]
  );

  const dragConstraints = useMemo(
    () => ({ top: snapPoints[0], bottom: snapPoints[2] }),
    [snapPoints]
  );

  return (
    <div className="md:hidden relative h-full">
      <div className="sticky top-0 z-30 pointer-events-auto">
        <div ref={topRef} className="px-4 pt-10">
          {top}
        </div>
      </div>

      <div ref={sheetRef} className="absolute inset-x-0 top-0 bottom-0">
        <motion.div
          className="absolute inset-x-0 bottom-0 top-38 rounded-t-3xl bg-white dark:bg-makcha-navy-900 shadow-[0_-12px_30px_rgba(0,0,0,0.12)] flex flex-col pointer-events-auto"
          style={{ y }}
          drag="y"
          dragListener={false}
          dragControls={dragControls}
          dragConstraints={dragConstraints}
          dragElastic={0.06}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
        >
          <div
            className="px-4 py-3 select-none touch-none"
            onPointerDown={(e) => {
              e.preventDefault();
              dragControls.start(e);
            }}
          >
            <div className="mx-auto h-1.5 w-12 rounded-full bg-gray-300" />
            <span className="block mt-2 text-gray-900 font-semibold text-xl">
              {title}
            </span>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-8 overscroll-contain no-scrollbar">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
