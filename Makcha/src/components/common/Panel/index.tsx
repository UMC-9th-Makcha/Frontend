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
    <aside
      className={`
        ${isMobileFull ? 'flex' : 'hidden md:flex'} 

        bg-white dark:bg-makcha-navy-900
        
        relative h-full shrink-0 z-39
        w-full flex-col overflow-hidden

        md:after:absolute md:after:top-0 md:after:bottom-0 md:after:right-0 
        md:after:w-px md:after:z-39

        md:after:bg-gray-200 md:dark:after:bg-makcha-navy-600/50

        md:shadow-[15px_0_40px_rgba(136,136,136,0.12),5px_0_15px_rgba(136,136,136,0.05)]
        md:dark:shadow-[20px_0_60px_rgba(0,0,0,0.6)]

        transition-all duration-200 ease-in-out
        ${width}
        ${className}
      `}
    >
      <div
        className={`
          relative flex flex-col w-full 
          overflow-y-auto overflow-x-hidden no-scrollbar
          ${disablePadding ? "h-full min-h-0" : "px-4 pt-8 pb-8"} 
          ${contentClassName}
        `}
      >
        <div className="w-full max-w-full">
          {children}
        </div>
      </div>
    </aside>
  );
};

export default Panel;