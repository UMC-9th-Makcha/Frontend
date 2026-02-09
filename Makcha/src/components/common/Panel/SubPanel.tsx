import { useEffect, type ReactNode } from "react";
import { ChevronLeft } from "lucide-react";

interface SubPanelProps {
  isOpen: boolean;
  onBack: () => void;
  title: string;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  width?: string;
  className?: string;
}

const SubPanel = ({
  isOpen,
  onBack,
  title,
  leftAction,
  rightAction,
  footer,
  children,
  width = "md:w-[400px]",
  className = "",
}: SubPanelProps) => {
  
  // [스크롤 잠금 및 단축키 로직]
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onBack();
    };

    // 모바일(768px 미만)일 때만 바디 스크롤 잠금
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      document.body.style.overflow = "hidden";
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (isMobile) {
        document.body.style.overflow = "";
      }
    };
  }, [isOpen, onBack]);

  if (!isOpen) return null;

  return (
    <aside
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className={`
        fixed inset-0 z-60 flex flex-col w-full h-full

        md:relative md:inset-auto md:z-auto md:h-[calc(100vh-48px)]
        md:ml-4 md:shrink-0 md:rounded-[32px]

        bg-white dark:bg-makcha-navy-900

        md:after:absolute md:after:inset-0 md:after:z-50 md:after:pointer-events-none
        md:after:rounded-[32px] md:after:border 
        md:after:border-gray-200 
        md:dark:after:border-makcha-navy-600/50

        md:shadow-[15px_0_40px_rgba(136,136,136,0.15),5px_0_15px_rgba(136,136,136,0.1)]
        md:dark:shadow-none

        transition-all duration-300 ease-in-out
        overflow-hidden

        ${width}
        ${className}
      `}
    >
      {/* 헤더 */}
      <header className="flex h-[60px] md:h-[72px] shrink-0 items-center justify-between px-4 md:px-6 border-b border-gray-200 dark:border-makcha-navy-600/50">
        <div className="flex items-center min-w-[32px]">
          {leftAction || (
            <button
              type="button"
              onClick={onBack}
              className="p-1 -ml-1 transition-transform active:scale-90 hover:opacity-70"
              aria-label="뒤로가기"
            >
              <ChevronLeft size={24} />
            </button>
          )}
        </div>
        
        {/* 타이틀 */}
        <h2 className="text-title truncate px-2">
          {title}
        </h2>
        
        <div className="flex items-center min-w-[32px] justify-end">
          {rightAction}
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar px-4 md:px-6 py-6 overscroll-contain"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="w-full max-w-full">
          {children}
        </div>
      </main>

      {/* 푸터 */}
      {footer && (
        <footer className="px-4 md:px-6 pb-8 pt-4 shrink-0 bg-inherit z-10">
          {footer}
        </footer>
      )}
    </aside>
  );
};

export default SubPanel;