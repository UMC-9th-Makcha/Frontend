import type { ReactNode } from "react";

interface PanelProps {
  children: ReactNode;
  width?: string;
  isMobileFull?: boolean;
  className?: string;
  disablePadding?: boolean;
  contentClassName?: string;
}

const Panel = ({
  children,
  width = "md:w-[400px]",
  isMobileFull = true,
  className = "",
  disablePadding = false,
  contentClassName = "",
}: PanelProps) => {
  return (
    <section
      className={`
        ${isMobileFull ? 'flex' : 'hidden md:flex'} 
        relative h-full z-39 overflow-hidden
        w-full max-w-[100vw] 
        flex-col border-none md:border-r 
        bg-white dark:bg-makcha-navy-900 
        border-gray-100 dark:border-white/5 
        ${width} shrink-0
        md:shadow-[15px_0_40px_rgba(0,0,0,0.08),5px_0_15px_rgba(0,0,0,0.03)] 
        md:dark:shadow-[20px_0_60px_rgba(0,0,10,0.5)]
        ${className}
      `}
    >
      <div
        className={`relative flex flex-col w-full overflow-y-auto no-scrollbar ${
          disablePadding ? "h-full min-h-0" : "px-4 pt-10 pb-16 md:pb-0"
        } ${contentClassName}`}
      >
        {children}
      </div>
    </section >
  );
};

export default Panel;