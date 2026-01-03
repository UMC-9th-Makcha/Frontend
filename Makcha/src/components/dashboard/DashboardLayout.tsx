import { useState } from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "./index";
import MobileHeader from "./MobileHeader";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex w-full min-h-screen bg-white dark:bg-makcha-navy-900">
      {/* 대시보드 설정 */}
      <Dashboard isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* 모바일 헤더 */}
        <MobileHeader isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* 메뉴 */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 dark:bg-transparent">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;