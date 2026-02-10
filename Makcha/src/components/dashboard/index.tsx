import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronsLeft, ChevronsRight, X } from 'lucide-react';
import DashboardNav from './components/DashboardNav';
import DarkModeToggle from './components/DarkModeToggle'; 
import { useAuth } from '../../hooks/useAuth';
import { sidebarSpring } from './constants';
import { useDashboardStore } from '../../store/useDashboardStore';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useSidebarMobileBehavior } from './hooks/useSidebarMobileBehavior';

const MotionLink = motion.create(Link);

const Dashboard = () => {
  const { user } = useAuth();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const isSidebarOpen = useDashboardStore(s => s.isSidebarOpen);
  const isSidebarCollapsed = useDashboardStore(s => s.isSidebarCollapsed);
  const setSidebarOpen = useDashboardStore(s => s.setSidebarOpen);
  const toggleSidebarCollapsed = useDashboardStore(s => s.toggleSidebarCollapsed);

  const isCollapsed = !isMobile && isSidebarCollapsed;

  const sidebarWidth = useMemo(() => {
    if (isMobile) return "100%";
    return isCollapsed ? 80 : 248;
  }, [isMobile, isCollapsed]);

  const logoSize = isCollapsed ? 40 : 56;

  useSidebarMobileBehavior(isMobile, isSidebarOpen, setSidebarOpen);

  const handleToggle = useCallback(() => {
    if (isMobile) {
      setSidebarOpen(!isSidebarOpen);
    } else {
      toggleSidebarCollapsed();
    }
  }, [isMobile, isSidebarOpen, setSidebarOpen, toggleSidebarCollapsed]);

  const handleLogoClick = useCallback(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile, setSidebarOpen]);

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: sidebarWidth, 
        x: (isMobile && !isSidebarOpen) ? "-100%" : 0 
      }}
      transition={sidebarSpring}
      className={`
        flex flex-col bg-gray-50 md:bg-white dark:bg-makcha-navy-900 
        overflow-hidden transition-colors duration-200
        ${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'sticky top-0 h-screen border-r md:border-gray-200 dark:md:border-makcha-navy-800'}
      `}
    >
      {/* 닫기/축소 버튼 */}
      <div className={`mt-4 flex h-10 shrink-0 items-center ${isCollapsed ? 'justify-center' : 'justify-end px-5'}`}>
        <button 
          onClick={handleToggle} 
          aria-label={isCollapsed ? "확장" : "축소"}
          className="p-2 text-gray-400 transition-colors rounded-lg hover:bg-gray-200 dark:hover:bg-white/5"
        >
          {isMobile ? <X size={24} /> : (isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />)}
        </button>
      </div>

      {/* 로고 영역 */}
      <div className={`mt-4 flex shrink-0 items-center ${isCollapsed ? 'justify-center' : 'px-7'}`}>
        <MotionLink 
          to={user ? "/home" : "/"} 
          onClick={handleLogoClick}
          className="flex items-center justify-center rounded-2xl"
        >
          <motion.div
            initial={false} 
            animate={{ width: logoSize, height: logoSize }}
            transition={sidebarSpring}
            className="relative flex items-center justify-center"
          >
            <img 
              src="/makcha.png" 
              className="h-full w-full object-contain" 
              alt="Makcha Logo" 
              loading="eager" 
            />
          </motion.div>
        </MotionLink>
      </div>

      {/* 다크모드 토글 */}
      <div className={`mt-8 flex shrink-0 items-center ${isCollapsed ? 'justify-center md:mt-4' : 'px-7 md:mt-6'}`}>
        <DarkModeToggle isCollapsed={isCollapsed} />
      </div>

      {/* 내비게이션 */}
      <nav className="w-full flex-1 no-scrollbar overflow-y-auto mt-2">
        <DashboardNav 
          dividerClass={`my-3 border-t border-gray-200 dark:border-makcha-navy-800 ${isCollapsed ? 'mx-4' : 'mx-7'}`} 
        />
      </nav>
    </motion.aside>
  );
};

export default Dashboard;