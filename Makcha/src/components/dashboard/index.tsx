import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NAV_MENUS } from './constants';
import type { DashboardProps } from '../../types/dashboard';
import DashboardItem from './DashboardItem';
import DashboardFooter from './DashboardFooter';

const KakaoIcon = ({ className }: { className?: string }) => (
  <div className={`flex items-center justify-center bg-[#FEE500] rounded-full p-[7px] ${className}`}>
    <svg width="100%" height="100%" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0C4.477 0 0 3.582 0 8C0 10.865 1.848 13.423 4.67 14.86L3.8 18.061C3.742 18.273 3.865 18.49 4.077 18.548C4.148 18.567 4.223 18.562 4.29 18.534L8.14 16.911C8.74 16.97 9.36 17 10 17C15.523 17 20 13.418 20 9C20 4.582 15.523 0 10 0Z" fill="#3C1E1E"/>
    </svg>
  </div>
);

const Dashboard = ({ isOpen, setIsOpen }: DashboardProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <aside
      className={`
        fixed left-0 z-50 flex flex-col transition-transform duration-300 ease-in-out
        bg-gray-50 md:bg-white
        top-21 bottom-0 w-full ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:sticky md:top-0 md:translate-x-0 md:w-[248px] md:h-screen md:shrink-0 md:border-r md:border-gray-100
      `}
    >
      {/* 로고 영역 */}
      <div className="hidden md:block pt-10 pl-9">
        <Link to="/" onClick={() => setIsOpen(false)} className="inline-block">
          <img
            src="https://placehold.co/64x64/png"
            alt="서비스 로고"
            className="w-[60px] h-[60px] rounded-[18px] object-cover"
          />
        </Link>
      </div>

      {/* 다크모드 */}
      <div className="flex items-center px-9 h-[60px] md:h-12 mt-8">
        <div className="flex items-center justify-center shrink-0 w-14 h-9 md:w-11 md:h-7">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`
              relative inline-flex items-center rounded-full transition-all duration-300
              w-14 h-[30px] md:w-11 md:h-6
              ${isDarkMode ? 'bg-gray-400' : 'bg-gray-200'}
              border border-gray-300/50 shadow-inner
            `}
          >
            <span
              className={`
                inline-block rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out
                h-[22px] w-[22px] md:h-[18px] md:w-[18px]
                ${isDarkMode ? 'translate-x-[30px] md:translate-x-[22px]' : 'translate-x-1'}
              `}
            />
          </button>
        </div>
        <span className="ml-5 font-medium text-[20px] md:text-[15px] leading-none text-gray-500">
          다크모드
        </span>
      </div>

      {/* 계정 정보 */}
      <div className="mt-6">
        <DashboardItem
          label="서막차님"
          path="/setting"
          icon={KakaoIcon}
          onClick={() => setIsOpen(false)}
          isStatic={true} 
        />
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className="flex-1 overflow-y-auto no-scrollbar mt-2">
        {NAV_MENUS.map((menu) => (
          <React.Fragment key={menu.id}>
            {menu.divider && (
              <div className="mx-3 md:mx-5 my-5 border-t border-[#E2E2E2]" />
            )}
            <DashboardItem
              label={menu.label}
              path={menu.path}
              icon={menu.icon}
              onClick={() => setIsOpen(false)}
            />
          </React.Fragment>
        ))}
      </nav>

      {/* 푸터 영역 */}
      <div className="pb-8 md:scale-90 origin-bottom">
        <DashboardFooter />
      </div>
    </aside>
  );
};

export default Dashboard;