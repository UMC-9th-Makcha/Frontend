import { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// 페이지 및 컴포넌트 임포트
import Main from "./pages/Main";
import Home from "./pages/Home";
import Alarm from "./pages/Alarm";
import WaitingSpot from "./pages/WaitingSpot";
import History from "./pages/History";
import Settings from "./pages/Setting";
import Download from "./pages/Download";
import Dashboard from "./components/dashboard";
import MobileHeader from "./components/dashboard/MobileHeader";

const SidebarLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-1 w-full bg-makcha-navy-900">
      {/* 사이드바: 고정 너비를 유지하며 부모 높이를 꽉 채움 */}
      <Dashboard isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* 메인 영역: flex-1로 나머지 공간을 채우고 배경색 명시 */}
      <div className="flex-1 flex flex-col min-w-0 bg-makcha-navy-900">
        <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
        
        {/* 실제 콘텐츠가 들어가는 곳 */}
        <main className="flex-1 p-4 md:p-8 bg-makcha-navy-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-makcha-navy-900 min-w-md overflow-x-auto">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route element={<SidebarLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/alarm" element={<Alarm />} />
            <Route path="/spot/:type" element={<WaitingSpot />} />
            <Route path="/history" element={<History />} />
            <Route path="/setting" element={<Settings />} />
            <Route path="/download" element={<Download />} />
          </Route>
          <Route path="*" element={<Main />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;