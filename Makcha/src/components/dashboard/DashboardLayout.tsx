import { Outlet } from "react-router-dom";
import Dashboard from "./index";
import MobileHeader from "./MobileHeader";

/**
 * DashboardLayout은 상태를 직접 관리하지 않고 
 * 전체적인 레이아웃 구조(Sidebar + Main)만 정의합니다.
 */
const DashboardLayout = () => {
  return (
    <div className="flex w-full min-h-screen bg-white dark:bg-makcha-navy-900">
      {/* 사이드바: 내부에서 Zustand 스토어를 구독함 */}
      <Dashboard />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* 모바일 헤더: 내부에서 Zustand 스토어를 구독함 */}
        <MobileHeader />
        
        {/* 메인 컨텐츠 영역 */}
        <main className="flex-1 w-full overflow-y-auto bg-gray-50/30 dark:bg-transparent">
          <div className="w-full h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;