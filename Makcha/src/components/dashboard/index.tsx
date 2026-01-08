import { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronsLeft, ChevronsRight, X } from 'lucide-react';
import DashboardNav from './DashboardNav';
import DarkModeToggle from './DarkModeToggle'; 
import { useAuth } from '../../hooks/useAuth';
import { sidebarSpring } from './constants';
import { useDashboardStore } from '../../store/useDashboardStore';
import { useMediaQuery } from '../../store/useMediaQuery';

const MotionLink = motion.create(Link);

const Dashboard = () => {
  const { user } = useAuth();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isSidebarOpen, isSidebarCollapsed, setSidebarOpen, toggleSidebarCollapsed } = useDashboardStore();

  const isCollapsed = !isMobile && isSidebarCollapsed;
  const sidebarWidth = isMobile ? "100%" : (isCollapsed ? 80 : 248);
  const logoSize = isCollapsed ? 40 : 56;

  useEffect(() => {
    if (!isMobile || !isSidebarOpen) {
      document.body.style.overflow = 'unset';
      document.body.style.overscrollBehaviorY = 'auto';
      return;
    }

    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehaviorY = 'none';

    window.history.pushState({ sidebar: 'open' }, '');
    const handlePopState = () => setSidebarOpen(false);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.body.style.overflow = 'unset';
      document.body.style.overscrollBehaviorY = 'auto';
      if (window.history.state?.sidebar === 'open') {
        window.history.back();
      }
    };
  }, [isMobile, isSidebarOpen, setSidebarOpen]);

  const handleToggle = useCallback(() => {
    if (isMobile) setSidebarOpen(!isSidebarOpen);
    else toggleSidebarCollapsed();
  }, [isMobile, isSidebarOpen, setSidebarOpen, toggleSidebarCollapsed]);

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: sidebarWidth, 
        x: (isMobile && !isSidebarOpen) ? "-100%" : 0 
      }}
      transition={sidebarSpring}
      className="fixed inset-y-0 left-0 z-45 flex flex-col bg-gray-50 md:bg-white dark:bg-makcha-navy-900 md:sticky md:top-0 md:h-screen md:border-r md:border-gray-200 dark:md:border-makcha-navy-800 overflow-hidden"
    >
      {/* 닫기/축소 버튼 */}
      <div className={`mt-4 flex h-10 shrink-0 items-center ${isCollapsed ? 'justify-center' : 'justify-end px-5'}`}>
        <button 
          onClick={handleToggle} 
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          {isMobile ? <X size={24} /> : (isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />)}
        </button>
      </div>

      {/* 로고 영역 */}
      {!isMobile && (
        <motion.div 
          layout
          className={`mt-4 flex shrink-0 items-center ${isCollapsed ? 'justify-center' : 'px-7'}`}
        >
          <MotionLink to={user ? "/home" : "/"} className="flex items-center justify-center">
            <motion.div
              layout
              initial={{ width: logoSize, height: logoSize }}
              animate={{ width: logoSize, height: logoSize }}
              transition={sidebarSpring}
              style={{ width: logoSize, height: logoSize }}
              className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <img 
                src="/makcha.png" 
                className="h-full w-full object-contain" 
                alt="Logo" 
              />
            </motion.div>
          </MotionLink>
        </motion.div>
      )}

      {/* 다크모드 토글 */}
      <motion.div 
        layout
        className={`mt-8 flex shrink-0 items-center ${isCollapsed ? 'justify-center md:mt-4' : 'px-7 md:mt-6'}`}
      >
        <DarkModeToggle isCollapsed={isCollapsed} />
      </motion.div>

      {/* 내비게이션 */}
      <div className="w-full flex-1 no-scrollbar overflow-y-auto mt-2">
        <DashboardNav 
          dividerClass={`my-3 border-t border-gray-100 dark:border-makcha-navy-800 ${isCollapsed ? 'mx-4' : 'mx-7'}`} 
        />
      </div>
    </motion.aside>
  );
};

export default Dashboard;