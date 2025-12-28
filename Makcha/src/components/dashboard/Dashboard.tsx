import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  AlarmClock, 
  Moon, 
  History, 
  Settings, 
  Download, 
  X 
} from 'lucide-react';

interface DashboardProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

const Dashboard = ({ isOpen, setIsOpen }: DashboardProps) => {
  const menus = useMemo(() => [
    { id: 'home', label: '대시보드', path: '/home', icon: LayoutDashboard },
    { id: 'alarm', label: '막차 알림 생성', path: '/alarm', icon: AlarmClock },
    { id: 'spot', label: '첫차 대기 장소', path: '/spot/first', icon: Moon },
    { id: 'history', label: '알림 내역', path: '/history', icon: History, divider: true },
    { id: 'setting', label: '환경 설정', path: '/setting', icon: Settings },
    { id: 'download', label: '막차 앱 다운로드', path: '/download', icon: Download },
  ], []);

  return (
    <aside className={`
      /* 레이아웃 공통 */
      fixed inset-y-0 left-0 z-50 flex flex-col bg-white transition-transform duration-300 ease-in-out
      w-full ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      md:relative md:translate-x-0 md:w-64 md:h-screen md:shrink-0 md:border-r md:border-gray-100 md:flex
    `}>
      
      {/* 1. 상단 로고 및 닫기 버튼 */}
      <div className="flex items-center justify-between p-6 pb-2">
        <div className="w-12 h-12 bg-makcha-navy-800 rounded-2xl flex items-center justify-center shadow-md">
          <span className="text-2xl" role="img" aria-label="logo">🦉</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="md:hidden p-2 text-gray-500">
          <X size={28} />
        </button>
      </div>

      {/* 2. 다크모드 토글 */}
      <div className="flex items-center space-x-3 px-7 my-6">
        <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 cursor-not-allowed">
          <span className="inline-block h-4 w-4 transform rounded-full bg-white shadow-sm translate-x-1" />
        </div>
        <span className="text-sm font-bold text-gray-500">다크모드</span>
      </div>

      {/* 3. 네비게이션 메뉴 */}
      <nav className="flex-1 px-4 space-y-1">
        {menus.map(({ id, label, path, icon: Icon, divider }) => (
          <React.Fragment key={id}>
            {divider && <div className="border-t border-gray-100 my-4 mx-2" />}
            <NavLink
              to={path}
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-4 px-4 py-3.5 transition-colors group"
            >
              {({ isActive }) => (
                <>
                  <Icon 
                    size={22} 
                    className={`transition-colors duration-200 ${
                      isActive 
                        ? 'text-makcha-navy-800' // 활성화 시
                        : 'text-gray-400 group-hover:text-gray-600' // 비활성 시 & 호버 시 약간 진하게
                    }`} 
                  />
                  <span className={`text-[15px] tracking-tight transition-colors duration-200 ${
                    isActive 
                      ? 'text-makcha-navy-900 font-extrabold' // 활성화 시
                      : 'text-gray-500 font-semibold group-hover:text-gray-700' // 비활성 시 & 호버 시 약간 진하게
                  }`}>
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          </React.Fragment>
        ))}
      </nav>

      {/* 4. 하단 카피라이트 */}
      <div className="p-6 text-center">
        <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
          Makcha. 
        </p>
        <span className="text-gray-300">Zero Friction, 100% Reliability</span>
      </div>
    </aside>
  );
};

export default Dashboard;