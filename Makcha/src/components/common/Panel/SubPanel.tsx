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
        fixed inset-0 z-50 flex flex-col bg-white dark:bg-makcha-navy-900 md:h-[calc(100vh-48px)]
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
      <header className="flex h-[72px] shrink-0 items-center justify-between px-6 border-b border-gray-100 dark:border-white/10">
        <div className="flex items-center min-w-[32px]">
          {leftAction || (
            <button 
              type="button" 
              onClick={onBack} 
              className="p-1 transition-all duration-200 ease-in-out active:scale-95 text-gray-900 dark:text-white hover:opacity-60"
            >
              <ChevronLeft size={24} />
            </button>
          )}
        </div>
        <h2 className="text-[18px] md:text-[20px] font-bold text-gray-900 dark:text-white">{title}</h2>
        <div className="flex items-center min-w-[32px] justify-end">{rightAction || null}</div>
      </header>

      <main 
        className="no-scrollbar flex-1 min-h-0 overflow-y-auto px-6 md:px-8 pt-6 md:pt-8 pb-6 overscroll-behavior-contain"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {children}
      </main>

      {footer && (
        <footer className="px-6 pb-20 md:pb-8 shrink-0">
          {footer}
        </footer>
      )}
    </section>
  );
};

export default SubPanel;