import { useState } from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "./index"; 
import MobileHeader from "./MobileHeader";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-1 w-full bg-makcha-navy-900">
      {/* 사이드바: 고정 너비를 유지하며 부모 높이를 꽉 채움 */}
      <Dashboard isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* 메인 영역: flex-1로 나머지 공간을 채우고 배경색 명시 */}
      <div className="flex-1 flex flex-col min-w-0 bg-makcha-navy-900">
        <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
        
        {/* 실제 콘텐츠가 들어가는 곳 (Outlet) */}
        <main className="flex-1 p-4 md:p-8 bg-makcha-navy-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;