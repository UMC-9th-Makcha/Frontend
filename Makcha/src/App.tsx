import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import Home from "./pages/Home";
import Alarm from "./pages/Alarm";
import WaitingSpot from "./pages/WaitingSpot";
import History from "./pages/History";
import Settings from "./pages/Setting";
import Download from "./pages/Download";

import SidebarLayout from "./components/dashboard/SidebarLayout";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-makcha-navy-900 min-w-md overflow-x-auto">
        <Routes>
          {/* 랜딩 페이지 및 404 처리 */}
          <Route path="/" element={<Main />} />
          
          {/* 대시보드 레이아웃이 적용되는 내부 페이지 그룹 */}
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