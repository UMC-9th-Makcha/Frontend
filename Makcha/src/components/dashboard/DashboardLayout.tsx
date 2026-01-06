import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Dashboard from "./index";
import MobileHeader from "./MobileHeader";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  // 두 페이지 모두 패딩이 없어야 하는(Full Page) 경우이므로 하나로 묶습니다.
  const isAlarmPage = pathname.startsWith("/alarm");
  const isSpotRoute = pathname.startsWith("/spot");
  
  // 임시 해결: 둘 중 하나라도 true면 p-0 적용
  const isFullContent = isAlarmPage || isSpotRoute;

  return (
    <div className="flex flex-1 w-full min-h-screen">
      {/* 사이드바 */}
      <Dashboard isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* 메인 영역 */}
      <div className="flex-1 flex flex-col min-w-0">
        <MobileHeader isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* 실제 콘텐츠 영역 */}
        <main 
          className={
            isFullContent 
              ? "flex-1 p-0 overflow-hidden" 
              : "flex-1 p-4 md:p-8"
          }
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;