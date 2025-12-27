import { BrowserRouter, Routes, Route } from "react-router-dom";

// 1. 각 페이지 컴포넌트 임포트
import Main from "./pages/Main";
import Home from "./pages/Home";
import Alarm from "./pages/Alarm";
import WaitingSpot from "./pages/WaitingSpot";
import History from "./pages/History";
import Settings from "./pages/Setting";
import Download from "./pages/Download";

function App() {
  return (
    <BrowserRouter>
      {/* 전체 앱의 공통 레이아웃 설정 
        - 배경색: 네이비 900 (#00163D)
      */}
      <div className=" mx-auto min-h-screen bg-makcha-navy-900 
      text-white shadow-2xl overflow-x-hidden">
        
        <Routes>
          {/* 0. 메인 & 로그인 화면 */}
          <Route path="/" element={<Main />} />
          
          {/* 1. 홈 (공용 컴포넌트 대시보드) */}
          <Route path="/home" element={<Home />} />
          
          {/* 2. 막차 알림 설정 */}
          <Route path="/alarm" element={<Alarm />} />
          
          {/* 3. 첫차/막차 대기 장소 (하나의 컴포넌트로 처리) */}
          <Route path="/spot/:type" element={<WaitingSpot />} />
          
          {/* 4. 알림 내역 */}
          <Route path="/history" element={<History />} />
          
          {/* 5. 환경 설정 */}
          <Route path="/setting" element={<Settings />} />
          
          {/* 6. 앱 다운로드 */}
          <Route path="/download" element={<Download />} />
          
          {/* 잘못된 경로 접근 시 메인으로 리다이렉트 */}
          <Route path="*" element={<Main />} />
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;