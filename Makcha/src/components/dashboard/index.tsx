import React from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { NAV_MENUS } from './constants';
import type { DashboardProps } from '../../types/dashboard';

const Dashboard = ({ isOpen, setIsOpen }: DashboardProps) => {
  return (
    <aside
      className={`
        /* 1. 레이아웃 고정: 모바일/데스크톱 모두 전체 높이 확보 */
        fixed inset-y-0 left-0 z-50 flex h-screen flex-col bg-white transition-transform duration-300 ease-in-out
        w-full ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        
        /* 2. 데스크톱 최적화: 화면에 고정되어 내용이 길어져도 따라오게 설정 */
        md:sticky md:top-0 md:translate-x-0 md:w-64 md:shrink-0 md:border-r md:border-gray-100
      `}
    >
      {/* 상단 로고 */}
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-makcha-navy-800 shadow-md">
          <span className="text-2xl" role="img" aria-label="makcha logo">
            🦉
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="p-2 text-gray-500 md:hidden"
          aria-label="메뉴 닫기"
        >
          <X size={28} />
        </button>
      </div>

      {/* 다크모드 */}
      <div className="mb-6 mt-2 flex items-center space-x-3 px-7">
        <div className="relative inline-flex h-6 w-11 cursor-not-allowed items-center rounded-full bg-gray-200">
          <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white shadow-sm" />
        </div>
        <span className="text-sm font-bold text-gray-500">다크모드</span>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 px-4 py-2 custom-scrollbar">
        {NAV_MENUS.map(({ id, label, path, icon: Icon, divider }) => (
          <React.Fragment key={id}>
            {divider && <div className="mx-2 my-4 border-t border-gray-100" />}
            <NavLink
              to={path}
              onClick={() => setIsOpen(false)}
              className="group flex items-center space-x-4 px-4 py-3.5 transition-colors"
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={22}
                    className={`transition-colors duration-200 ${
                      isActive
                        ? 'text-makcha-navy-800'
                        : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  />
                  <span
                    className={`text-[15px] tracking-tight transition-colors duration-200 ${
                      isActive
                        ? 'text-makcha-navy-900 font-extrabold'
                        : 'text-gray-500 font-semibold group-hover:text-gray-700'
                    }`}
                  >
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          </React.Fragment>
        ))}
      </nav>

      {/* 하단 푸터 */}
      <div className="border-t border-gray-50 p-6 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400">
          Makcha.
        </p>
        <p className="mt-1 text-[10px] leading-tight text-gray-300">
          Zero Friction, 100% Reliability
        </p>
      </div>
    </aside>
  );
};

export default Dashboard;