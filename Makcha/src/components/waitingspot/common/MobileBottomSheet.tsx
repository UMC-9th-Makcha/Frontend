import { useEffect, useRef, useState } from "react";
import { animate, motion, useDragControls, useMotionValue } from "framer-motion";
import type { ReactNode } from "react";

type MobileBottomSheetProps = {
  top: ReactNode;
  children: ReactNode;
  title?: string;
};

export const MobileBottomSheet = ({top,children,title = "첫차 대기 장소"}: MobileBottomSheetProps) => {
  const CARD_HEIGHT = 96;
  const MID_VISIBLE_COUNT = 2.9;
  const PEEK_HEIGHT = 140;

  const dragControls = useDragControls();
  const sheetRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const [yOpen, setYOpen] = useState(0);
  const [yClosed, setYClosed] = useState(0);

  const y = useMotionValue(0);

  const yMid = Math.max(yOpen, yClosed - CARD_HEIGHT * MID_VISIBLE_COUNT
  );
  const snapPoints = [yOpen, yMid, yClosed] as const;

  // 초기/리사이즈에 스냅 포인트 재계산 (모바일 주소창 변화 대응)
  useEffect(() => {
    const recalc = () => {
      const sheetH = sheetRef.current?.clientHeight ?? 0;
      const topH = topRef.current?.clientHeight ?? 0;

      setYOpen(topH + 8);
      setYClosed(Math.max(0, sheetH - PEEK_HEIGHT));
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
  }, [yOpen, yClosed]);

  const snapTo = (index: 0 | 1 | 2) => {
    const target = snapPoints[index];
    y.stop();
    animate(y, target, {
      type: "spring",
      stiffness: 380,
      damping: 44,
      onComplete: () => y.set(target),
    });
  };

  const nearestIndex = (value: number) => {
    const d0 = Math.abs(value - snapPoints[0]);
    const d1 = Math.abs(value - snapPoints[1]);
    const d2 = Math.abs(value - snapPoints[2]);
    return (d0 <= d1 && d0 <= d2 ? 0 : d1 <= d2 ? 1 : 2) as 0 | 1 | 2;
  };

  //“방향 우선” 스냅
  const pickSnapIndex = (value: number, velocityY: number) => {
    const VELOCITY_THRESHOLD = 150;

    if (Math.abs(velocityY) > VELOCITY_THRESHOLD) {
      if (velocityY < 0) return (value <= snapPoints[1] ? 0 : 1) as 0 | 1 | 2;
      return (value >= snapPoints[1] ? 2 : 1) as 0 | 1 | 2;
    }

    return nearestIndex(value);
  };

  return (
    <div className="md:hidden relative h-full">
      <div className="sticky top-0 z-30 pointer-events-auto">
        <div ref={topRef} className="px-4 pt-10">
          {top}
        </div>
      </div>

      <div ref={sheetRef} className="absolute inset-x-0 top-0 bottom-0">
        <motion.div
          className="absolute inset-x-0 bottom-0 top-0 rounded-t-3xl bg-white dark:bg-makcha-navy-900 shadow-[0_-12px_30px_rgba(0,0,0,0.12)] flex flex-col pointer-events-auto"
          style={{ y }}
          drag="y"
          dragListener={false}
          dragControls={dragControls}
          dragConstraints={{ top: yOpen, bottom: yClosed }}
          dragElastic={0.06}
          dragMomentum={false}
          onDragEnd={(_, info) => {
            const current = y.get();
            const next = pickSnapIndex(current, info.velocity.y);
            snapTo(next);
          }}
        >
          <div
            className="px-4 py-3 select-none touch-none"
            onPointerDown={(e) => {
              e.preventDefault();
              dragControls.start(e);
            }}
          >
            <div className="mx-auto h-1.5 w-12 rounded-full bg-gray-300" />
            <span className="block mt-2 text-[#262626] font-semibold text-xl">
              {title}
            </span>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-8 overscroll-contain">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
