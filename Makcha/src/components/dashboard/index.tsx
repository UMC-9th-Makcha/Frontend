import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_MENUS } from './constants';
import type { DashboardProps } from '../../types/dashboard';
import DashboardItem from './DashboardItem';
import DashboardFooter from './DashboardFooter';
import { useUIStore } from '../../store/useUIStore';
import { UserIcon, type IconProps } from './UserIcon';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = ({ isOpen, setIsOpen }: DashboardProps) => {
  const { isDarkMode, toggleDarkMode } = useUIStore();
  
  const { user } = useAuth();

  return (
    <aside
      className={`
        fixed left-0 z-50 flex flex-col transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        top-20 bottom-0 w-full
        bg-white dark:bg-makcha-navy-900
        md:sticky md:top-0 md:translate-x-0 md:w-[248px] md:h-screen md:shrink-0 md:border-r 
        md:bg-white dark:md:bg-makcha-navy-900
        dark:border-makcha-navy-800
      `}
    >
      {/* 로고 영역 */}
      <div className="hidden md:block pt-10 pl-9">
        <Link to="/home" onClick={() => setIsOpen(false)} className="inline-block">
          <img
            src="https://placehold.co/64x64/png"
            alt="서비스 로고"
            className="w-[60px] h-[60px] rounded-[18px] object-cover"
          />
        </Link>
      </div>

      {/* 다크모드 설정 */}
      <div className="flex items-center px-9 h-[60px] md:h-12 mt-8">
        <div className="flex items-center justify-center shrink-0 w-14 h-9 md:w-11 md:h-7">
          <button
            onClick={toggleDarkMode}
            className={`
              relative inline-flex items-center rounded-full transition-all duration-300
              w-14 h-[30px] md:w-11 md:h-6
              ${isDarkMode ? 'bg-makcha-navy-400' : 'bg-gray-200'}
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
        <span className="ml-5 font-medium text-[20px] md:text-[15px] leading-none text-gray-500 dark:text-makcha-navy-200">
          다크모드
        </span>
      </div>

      {/* 계정 정보 */}
      <div className="mt-6">
        <DashboardItem
          label={`${user?.nickname ?? '게스트'}님`}
          path="/setting"
          icon={(props: IconProps) => <UserIcon user={user} {...props} />}
          onClick={() => setIsOpen(false)}
          isStatic={true} 
        />
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className="flex-1 overflow-y-auto no-scrollbar mt-2">
        {NAV_MENUS.map((menu) => (
          <React.Fragment key={menu.id}>
            {menu.divider && (
              <div className="mx-3 md:mx-5 my-5 border-t border-[#E2E2E2] dark:border-makcha-navy-800" />
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