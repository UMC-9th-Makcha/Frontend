import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUIStore } from "./store/useUIStore";

import Main from "./pages/Main";
import Home from "./pages/Home";
import Alarm from "./pages/Alarm";
import WaitingSpot from "./pages/WaitingSpot";
import History from "./pages/History";
import Settings from "./pages/Setting";
import Download from "./pages/Download";

import DashboardLayout from "./components/dashboard/DashboardLayout";
import ErrorPage from "./pages/Error";
import { ProtectedRoute, PublicRoute } from "./components/kakao/KakaoRoute";
import KakaoCallback from "./components/kakao/KakaoCallback";

function App() {
  const isDarkMode = useUIStore((state) => state.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      {/* 수정 포인트: 
        1. min-w-md 제거 (모바일 대응 방해)
        2. w-full 추가 (화면 꽉 채우기)
        3. overflow-x-hidden (가로 스크롤 절대 방지)
      */}
      <div className="min-h-screen w-full overflow-x-hidden bg-white dark:bg-makcha-navy-900">
        <Routes>
          <Route path="/kakao/callback" element={<KakaoCallback />} />

          {/* 비로그인 전용 경로 */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Main />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>

          {/* 로그인 경로 */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/alarm" element={<Alarm />} />
              <Route path="/spot/:type" element={<WaitingSpot />} />
              <Route path="/history" element={<History />} />
              <Route path="/setting" element={<Settings />} />
              <Route path="/download" element={<Download />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;