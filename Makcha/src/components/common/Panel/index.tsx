import type { ReactNode } from "react";

interface PanelProps {
  children: ReactNode;
  width?: string;
  isMobileFull?: boolean;
  className?: string;
}

const Panel = ({
  children,
  width = "md:w-[400px]",
  isMobileFull = true,
  className = "",
}: PanelProps) => {
  return (
    <section
      className={`
        ${isMobileFull ? 'flex' : 'hidden md:flex'} 
        relative z-10
        h-full w-full flex-col border-r 
        bg-white dark:bg-makcha-navy-900 
        border-gray-100 dark:border-white/5 
        ${width} shrink-0
        md:shadow-[15px_0_40px_rgba(0,0,0,0.08),5px_0_15px_rgba(0,0,0,0.03)] 
        md:dark:shadow-[20px_0_60px_rgba(0,0,10,0.5)]
        ${className}
      `}
    >
      <div 
        className={`
          flex-1 min-h-0 overflow-y-auto px-[20px] pt-[30px] md:pt-[60px] 
          no-scrollbar
        `}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="relative flex flex-col w-full min-h-full pb-5">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Panel;