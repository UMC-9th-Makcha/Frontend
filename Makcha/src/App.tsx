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

function App() {
  // Zustand에서 다크모드 상태 구독
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
      <div className="min-h-screen min-w-md overflow-x-auto">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route element={<DashboardLayout />}>
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