import type { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";

interface SubPanelProps {
  isOpen: boolean;
  onBack: () => void;      // 뒤로가기
  title: string;
  leftAction?: ReactNode;  // 좌측 버튼
  rightAction?: ReactNode; // 우측 버튼
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
  width = "md:w-100",
  className = "",
}: SubPanelProps) => {
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

        shadow-[-10px_0_30px_rgba(0,0,0,0.04)]
        transition-all duration-300 ease-in-out
        ${className}
      `}
    >
      <header className="flex h-[72px] shrink-0 items-center justify-between px-6 border-b border-gray-100 dark:border-white/15">
        <button 
          type="button" 
          onClick={onBack} 
          className="p-1 transition-transform active:scale-90"
        >
          <ChevronLeft size={24} className="text-gray-900 dark:text-white" />
        </button>

        <h2 className="text-[20px] font-bold text-gray-900 dark:text-white">
          {title}
        </h2>

        <div className="flex items-center min-w-[32px] justify-end">
          {rightAction || null}
        </div>
      </header>

      {/* 컨텐츠 */}
      <main className="no-scrollbar flex-1 min-h-0 overflow-y-auto px-8 pt-8 pb-10">
        {children}
      </main>
    </section>
  );
};

export default SubPanel;