import { useEffect, type ReactNode } from "react";
import { ChevronLeft } from "lucide-react";

interface SubPanelProps {
  isOpen: boolean;
  onBack: () => void;
  title: string;
  rightAction?: ReactNode;
  children: ReactNode;
  width?: string;
  className?: string;
}

const SubPanel = ({
  isOpen,
  onBack,
  title,
  rightAction,
  children,
  width = "md:w-[400px]",
  className = "",
}: SubPanelProps) => {
  
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onBack();
    };

    const originalStyle = document.body.style.overflow;
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
        h-full w-full ${width} shrink-0

        border-none md:border md:border-gray-100 dark:md:border-white/10
        md:rounded-[40px] overflow-hidden

        md:shadow-[0_0_60px_rgba(0,0,0,0.15),0_0_20px_rgba(0,0,0,0.05)]
        md:dark:shadow-[0_0_80px_rgba(0,0,15,0.7),0_0_30px_rgba(0,0,0,0.4)]
        
        transition-all duration-300 ease-in-out
        ${className}
      `}
    >
      {/* 헤더 영역 */}
      <header className="flex h-[72px] shrink-0 items-center justify-between px-6 border-b border-gray-100 dark:border-white/10">
        <button 
          type="button" 
          onClick={onBack} 
          className="p-1 transition-all duration-200 ease-in-out active:scale-95 text-gray-900 dark:text-white hover:opacity-60"
          aria-label="뒤로 가기"
        >
          <ChevronLeft size={24} />
        </button>

        <h2 className="text-[18px] md:text-[20px] font-bold text-gray-900 dark:text-white">
          {title}
        </h2>

        <div className="flex items-center min-w-[32px] justify-end">
          {rightAction || null}
        </div>
      </header>

      {/* 컨텐츠 영역 */}
      <main 
        className="no-scrollbar flex-1 min-h-0 overflow-y-auto px-6 md:px-8 pt-6 md:pt-8 pb-10 overscroll-behavior-contain"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {children}
      </main>
    </section>
  );
};

export default SubPanel;