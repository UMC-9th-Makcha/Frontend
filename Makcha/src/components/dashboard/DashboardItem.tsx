import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { sidebarSpring } from './constants';
import { useDashboardStore } from '../../store/useDashboardStore';
import { useMediaQuery } from '../../store/useMediaQuery';
import type { DashboardItemProps } from '../../types/dashboard';

const DashboardItem = React.memo(({ 
  label, 
  path, 
  icon: Icon, 
  onClick, 
  isStatic = false 
}: DashboardItemProps) => {

  const isSidebarCollapsed = useDashboardStore((state) => state.isSidebarCollapsed);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isCollapsed = !isMobile && isSidebarCollapsed;

  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) => `
        group flex items-center h-[60px] md:h-12 overflow-hidden
        hover:bg-gray-100/50 dark:hover:bg-makcha-navy-800/50
        transition-colors duration-200
        ${isCollapsed ? 'md:justify-center px-0' : 'px-7'}
        ${!isStatic && isActive ? 'bg-blue-50/50 dark:bg-makcha-navy-800' : ''}
      `}
    >
      {({ isActive }) => {
        const active = !isStatic && isActive;
        
        return (
          <>
            <motion.div 
              layout
              transition={sidebarSpring}
              className={`flex items-center justify-center shrink-0 aspect-square ${isCollapsed ? 'w-7 h-7' : 'w-6 h-6 mr-4'}`}
            >
              <Icon className={`w-full h-full stroke-[2px] transition-colors duration-200 ${active ? 'text-blue-600 dark:text-white' : 'text-gray-400'}`} />
            </motion.div>
            
            <AnimatePresence mode="popLayout">
              {!isCollapsed && (
                <motion.span
                  key="label"
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={sidebarSpring}
                  className={`text-[16px] whitespace-nowrap overflow-hidden ${
                    active ? 'text-makcha-navy-900 dark:text-white font-bold' : 'text-gray-400 dark:text-gray-500 font-medium'
                  }`}
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </>
        );
      }}
    </NavLink>
  );
});

DashboardItem.displayName = 'DashboardItem';
export default DashboardItem;