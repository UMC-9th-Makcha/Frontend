import { memo } from 'react';
import { Outlet } from "react-router-dom";
import Dashboard from "../index";
import MobileNav from "./MobileNav";
import { useMediaQuery } from '../../../hooks/useMediaQuery';

const DashboardLayout = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="flex flex-col w-full h-dvh bg-white dark:bg-makcha-navy-900 overflow-hidden">

      <div className="flex-1 flex min-h-0 w-full relative">
        <Dashboard /> 
        <main 
          id="main-content"
          role="main"
          className="flex-1 min-w-0 overflow-y-auto no-scrollbar relative focus:outline-none"
        >
          <Outlet />
        </main>
      </div>

      {isMobile && (
        <footer className="shrink-0 w-full border-t border-gray-200 dark:border-makcha-navy-800 bg-white dark:bg-makcha-navy-900 z-40">
          <MobileNav />
        </footer>
      )}
    </div>
  );
};

export default memo(DashboardLayout);