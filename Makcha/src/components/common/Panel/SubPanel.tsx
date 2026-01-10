import { useEffect, type ReactNode } from "react";
import { ChevronLeft } from "lucide-react";

interface SubPanelProps {
  isOpen: boolean;
  onBack: () => void;      // 뒤로가기/닫기 함수
  title: string;
  leftAction?: ReactNode;  // 좌측 추가 액션 (필요 시)
  rightAction?: ReactNode; // 우측 버튼 (저장, 삭제 등)
  children: ReactNode;     // 패널 내부 콘텐츠
  width?: string;          // 데스크탑 너비 커스텀
  className?: string;      // 추가 스타일 확장
}

const SubPanel = ({
  isOpen,
  onBack,
  title,
  rightAction,
  children,
  width = "md:w-100",
  className = "",
}: SubPanelProps) => {
  
  // ESC 키 감지 및 바디 스크롤 제어
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onBack();
      }
    };

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen, onBack]);

  if (!isOpen) return null;

  return (
    <section
      className={`
        fixed inset-0 z-50 flex flex-col bg-white dark:bg-makcha-navy-900
        md:relative md:inset-auto md:z-0 md:ml-4

        h-full w-full ${width} shrink-0 overscroll-y-none

        md:rounded-[40px] overflow-hidden
        border-l border-gray-100 dark:border-white/10
        md:border md:border-gray-100 dark:md:border-white/10

        md:shadow-[0_0_60px_rgba(0,0,0,0.15),0_0_20px_rgba(0,0,0,0.05)]
        md:dark:shadow-[0_0_80px_rgba(0,0,15,0.7),0_0_30px_rgba(0,0,0,0.4)]
        transition-all duration-300 ease-in-out
        ${className}
      `}
    >
      {/* 헤더 영역 */}
      <header className="flex h-[72px] shrink-0 items-center justify-between px-6 border-b border-gray-100 dark:border-white/15">
        {/* 뒤로가기 버튼 */}
        <button 
          type="button" 
          onClick={onBack} 
          className="p-1 transition-all duration-200 ease-in-out active:scale-95 cursor-pointer hover:scale-110 text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-400"
          aria-label="뒤로 가기"
        >
          <ChevronLeft size={24} />
        </button>

        {/* 중앙 타이틀 */}
        <h2 className="text-[20px] font-bold text-gray-900 dark:text-white">
          {title}
        </h2>

        {/* 우측 영역 (없을 경우 공간 확보용 빈 div) */}
        <div className="flex items-center min-w-[32px] justify-end transition-all duration-200 ease-in-out cursor-pointer hover:scale-110 text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-400">
          {rightAction || null}
        </div>
      </header>

      {/* 컨텐츠 영역 */}
      <main className="no-scrollbar flex-1 min-h-0 overflow-y-auto px-8 pt-8 pb-10">
        {children}
      </main>
    </section>
  );
};

export default SubPanel;