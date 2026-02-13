import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUIStore } from "./store/useUIStore";
import { useAutoLogin } from "./hooks/useAutoLogin";

import Main from "./pages/Main";
import Home from "./pages/Home";
import Alarm from "./pages/Alarm";
import WaitingSpot from "./pages/WaitingSpot";
import WalkingDirections from "./pages/WaitingSpot/WalkingDirections";
import History from "./pages/History";
import Settings from "./pages/Setting";
import Download from "./pages/Download";

import DashboardLayout from "./components/dashboard/components/DashboardLayout";
import ErrorPage from "./pages/Error";
import { ProtectedRoute, PublicRoute } from "./components/kakao/KakaoRoute";
import KakaoCallback from "./components/kakao/KakaoCallback";
import FAB from "./components/common/FAB";
import Toast from "./components/common/toast";
import LoadingSpinner from "./components/common/loadingSpinner";

function App() {
  const isDarkMode = useUIStore((state) => state.isDarkMode);

  const isLoading = useAutoLogin();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <FAB />
      <Toast />
      <div className="min-h-screen w-full overflow-x-hidden">
        <Routes>
          <Route path="/kakao/callback" element={<KakaoCallback />} />

          <Route element={<DashboardLayout />}>

            {/* 비로그인 */}
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Main />} />
            </Route>
            
            <Route path="/alarm" element={<Alarm />} />
            <Route path="/download" element={<Download />} />

            {/* 로그인 */}
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/spot/:type" element={<WaitingSpot />} />
              <Route path="/spot/:type/:placeId" element={<WalkingDirections />} />
              <Route path="/history" element={<History />} />
              <Route path="/setting" element={<Settings />} />
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;