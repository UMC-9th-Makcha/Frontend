import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { sidebarSpring } from '../constants';
import { useDashboardStore } from '../../../store/useDashboardStore';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import type { DashboardItemProps } from '../types/dashboard';

const DashboardItem = React.memo(({ 
  label, 
  path, 
  icon: Icon, 
  onClick, 
  isStatic = false 
}: DashboardItemProps) => {

  const isSidebarCollapsed = useDashboardStore(state => state.isSidebarCollapsed);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const isCollapsed = useMemo(() => !isMobile && isSidebarCollapsed, [isMobile, isSidebarCollapsed]);

  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) => {
        const active = !isStatic && isActive;
        return `group flex items-center h-[60px] md:h-12 overflow-hidden transition-colors duration-200 
                ${isCollapsed ? 'md:justify-center px-0' : 'px-7'} 
                ${active ? 'bg-gray-50 dark:bg-makcha-navy-800' : ''}`;
      }}
    >
      {({ isActive }) => {
        const active = !isStatic && isActive;
        
        return (
          <>
            <motion.div 
              layout="position"
              transition={sidebarSpring}
              className={`flex items-center justify-center shrink-0 aspect-square 
                ${isCollapsed ? 'w-7 h-7' : 'w-6 h-6 mr-4'}`}
            >
              <Icon 
                className={`w-full h-full stroke-[2px] transition-colors duration-200
                ${active ? 'text-makcha-navy-600 dark:text-gray-50' : 'text-gray-400'}`} 
              />
            </motion.div>
            
            <AnimatePresence mode="popLayout" initial={false}>
              {!isCollapsed && (
                <motion.span
                  key="label"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  transition={sidebarSpring}
                  className={`text-body whitespace-nowrap select-none ${
                    active 
                      ? 'font-bold text-makcha-navy-600 dark:text-gray-50' 
                      : 'text-gray-400 dark:text-gray-500'
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