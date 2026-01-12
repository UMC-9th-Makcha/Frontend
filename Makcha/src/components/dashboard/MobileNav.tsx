import { useMemo, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_MENUS } from './constants';
import { useDashboardStore } from '../../store/useDashboardStore';

const ACT = "bg-gray-100 dark:bg-makcha-navy-800 text-blue-600 dark:text-white font-bold";
const DFT = "text-gray-400 dark:text-gray-500";
const TABS = NAV_MENUS.slice(0, 4);

const MobileNav = () => {
  const { pathname } = useLocation();
  const { isSidebarOpen, setSidebarOpen } = useDashboardStore();

  // 현재 경로가 하단 탭인지 확인
  const isTab = useMemo(() => TABS.some(t => t.path === pathname), [pathname]);
  // 메뉴 버튼 활성화 여부
  const menuOn = useMemo(() => isSidebarOpen || !isTab, [isSidebarOpen, isTab]);

  // 핸들러 메모이제이션
  const closeSidebar = useCallback(() => setSidebarOpen(false), [setSidebarOpen]);
  const toggleSidebar = useCallback(() => setSidebarOpen(!isSidebarOpen), [isSidebarOpen, setSidebarOpen]);

  return (
    <nav className="relative w-full shrink-0 h-16 bg-white dark:bg-makcha-navy-900 border-t border-gray-100 dark:border-makcha-navy-800 flex items-center justify-around z-50 md:hidden">
      {TABS.map((t) => {
        const on = !isSidebarOpen && pathname === t.path;
        return (
          <NavLink
            key={t.id}
            to={t.path}
            onClick={closeSidebar}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${on ? ACT : DFT}`}
          >
            <t.icon size={24} />
            <span className="text-[10px] mt-1 font-medium">{t.label}</span>
          </NavLink>
        );
      })}
      
      <button 
        onClick={toggleSidebar} 
        className={`flex flex-col items-center justify-center w-full h-full transition-colors appearance-none outline-none ${menuOn ? ACT : DFT}`}
      >
        {/* 아이콘 애니메이션 */}
        <div className="relative h-6 w-6 flex items-center justify-center">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={isSidebarOpen ? 'close' : 'menu'}
              initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="absolute flex items-center justify-center"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <span className="text-[10px] mt-1 font-medium">
          {isSidebarOpen ? '닫기' : '메뉴'}
        </span>
      </button>
    </nav>
  );
};

export default MobileNav;