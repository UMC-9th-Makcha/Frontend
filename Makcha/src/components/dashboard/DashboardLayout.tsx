import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Dashboard from "./index";
import MobileHeader from "./MobileHeader";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const location = useLocation();
  const isSpotRoute = location.pathname.startsWith("/spot");


  return (
    <div className="flex flex-1 w-full min-h-screen">
      {/* 사이드바 */}
      <Dashboard isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* 메인 영역 */}
      <div className="flex-1 flex flex-col min-w-0">
        <MobileHeader isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* 실제 콘텐츠 영역 */}
        <main className={isSpotRoute ? "flex-1 p-0" : "flex-1 p-4 md:p-8"}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;