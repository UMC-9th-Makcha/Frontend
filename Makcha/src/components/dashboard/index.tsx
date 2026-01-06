import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronsLeft, ChevronsRight, X } from 'lucide-react';
import DashboardNav from './DashboardNav';
import DashboardFooter from './DashboardFooter';
import DarkModeToggle from './DarkModeToggle'; 
import { useAuth } from '../../hooks/useAuth';
import { sidebarSpring } from './constants';
import type { DashboardProps } from '../../types/dashboard';

const MotionLink = motion.create(Link);

const Dashboard = ({ isOpen, setIsOpen }: DashboardProps) => {
  const { user } = useAuth();
  
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsCollapsed(false);
    };

    window.addEventListener('resize', handleResize);
    
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehaviorY = 'contain';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.overscrollBehaviorY = 'auto';
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'unset';
      document.body.style.overscrollBehaviorY = 'auto';
    };
  }, [isOpen, isMobile]);

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: isMobile ? "100%" : (isCollapsed ? 80 : 248),
        x: isMobile ? (isOpen ? 0 : "-100%") : 0
      }}
      transition={sidebarSpring}
      className="fixed inset-y-0 left-0 z-45 flex flex-col bg-gray-50 md:bg-white dark:bg-makcha-navy-900 md:sticky md:top-0 md:h-screen md:border-r md:border-gray-200 dark:md:border-makcha-navy-800"
    >
      {/* 축소 */}
      <div className={`flex w-full mt-6 ${isCollapsed ? 'justify-center' : 'justify-end px-5'}`}>
        <button 
          onClick={() => isMobile ? setIsOpen(false) : setIsCollapsed(!isCollapsed)} 
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200"
        >
          {isMobile ? (
            <X size={24} />
          ) : (
            isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />
          )}
        </button>
      </div>

      {/* 로고 */}
      {!isMobile && (
        <motion.div 
          layout 
          initial={false} 
          transition={sidebarSpring} 
          className="mt-6 flex items-center w-full"
        >
          <MotionLink 
            layout 
            initial={false}
            to={user ? "/home" : "/"} 
            transition={sidebarSpring}
            className={`flex items-center w-full ${isCollapsed ? 'justify-center px-0' : 'justify-start px-7'}`}
          >
            <motion.div
              layout
              initial={false}
              animate={{ 
                width: isCollapsed ? 40 : 56, 
                height: isCollapsed ? 40 : 56 
              }}
              transition={sidebarSpring}
              className="relative overflow-hidden rounded-2xl shrink-0 bg-white shadow-sm"
            >
              <img src="/makcha.png" className="w-full h-full object-contain" alt="Logo" />
            </motion.div>
          </MotionLink>
        </motion.div>
      )}

      {/* 다크모드 토글  */}
      <motion.div 
        layout 
        initial={false}
        transition={sidebarSpring} 
        className={`mt-6 flex ${isCollapsed ? 'justify-center' : 'justify-start px-7'}`}
      >
        <DarkModeToggle isCollapsed={isCollapsed} />
      </motion.div>

      {/* 내비게이션 메뉴 */}
      <div className="flex-1 overflow-y-auto no-scrollbar w-full">
        <DashboardNav 
          user={user} 
          isCollapsed={isCollapsed} 
          onItemClick={() => isMobile && setIsOpen(false)} 
          dividerClass={`my-3 border-t border-gray-100 dark:border-makcha-navy-800 ${isCollapsed ? 'mx-4' : 'mx-7'}`} 
        />
      </div>

      {/* 푸터 */}
      {!isCollapsed && !isMobile && (
        <div className="pb-8 px-7 origin-bottom scale-90 shrink-0 w-full">
          <DashboardFooter />
        </div>
      )}
    </motion.aside>
  );
};

export default Dashboard;