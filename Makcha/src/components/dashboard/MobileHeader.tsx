import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useDashboardStore } from '../../store/useDashboardStore';

const MobileHeader = React.memo(() => {
  const { user } = useAuth();

  const isSidebarOpen = useDashboardStore((state) => state.isSidebarOpen);
  const setSidebarOpen = useDashboardStore((state) => state.setSidebarOpen);

  const handleLogoClick = useCallback(() => {
    setSidebarOpen(false);
  }, [setSidebarOpen]);

  const handleToggleMenu = useCallback(() => {
    setSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen, setSidebarOpen]);

  return (
    <header className="sticky top-0 z-48 flex h-16 w-full items-center justify-between px-4 
      bg-white dark:bg-makcha-navy-900 border-b border-gray-100 dark:border-makcha-navy-800 
      md:hidden overflow-hidden">
      
      {/* 로고 영역 */}
      <div className="flex items-center">
        <Link 
          to={user ? "/home" : "/"}
          onClick={handleLogoClick} 
          className="flex items-center"
        >
          <img
            src='/makcha.png'
            alt="로고"
            width={40}
            height={40}
            style={{ width: '40px', height: '40px' }}
            className="rounded-lg object-cover"
          />
        </Link>
      </div>

      <div className="flex items-center space-x-3">
        {/* 닉네임 */}
        <span className="text-xs font-semibold text-makcha-navy-800 dark:text-makcha-navy-200 truncate max-w-[100px]">
          {user?.nickname ?? '게스트'}님
        </span>
        
        <button 
          onClick={handleToggleMenu} 
          className="relative h-9 w-9 flex items-center justify-center text-makcha-navy-900 dark:text-white 
          focus:outline-none"
          aria-label={isSidebarOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
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
        </button>
      </div>
    </header>
  );
});

MobileHeader.displayName = 'MobileHeader';

export default MobileHeader;