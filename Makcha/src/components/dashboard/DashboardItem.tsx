import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { sidebarSpring } from './constants';
import type { DashboardItemProps } from '../../types/dashboard';

const DashboardItem = ({ label, path, icon: Icon, onClick, isStatic = false, isCollapsed = false }: DashboardItemProps) => {
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
            {/* 아이콘 */}
            <motion.div 
              layout // [애니메이션] 레이아웃 변화 자동 감지
              transition={sidebarSpring} // [애니메이션] 공통 스프링 설정 적용
              className={`flex items-center justify-center shrink-0 aspect-square ${isCollapsed ? 'w-7 h-7' : 'w-6 h-6 mr-4'}`}
            >
              <Icon className={`w-full h-full stroke-[2px] transition-colors duration-200 ${active ? 'text-blue-600 dark:text-white' : 'text-gray-400'}`} />
            </motion.div>
            
            {/* 이름 */}
            <AnimatePresence mode="popLayout">
              {!isCollapsed && (
                <motion.span
                  key="label"
                  layout // [애니메이션] 아이콘 이동과 동기화
                  initial={{ opacity: 0, x: -10 }} // [애니메이션] 시작 상태
                  animate={{ opacity: 1, x: 0 }}    // [애니메이션] 등장 상태
                  exit={{ opacity: 0, x: -10 }}     // [애니메이션] 퇴장 상태
                  transition={sidebarSpring} // [애니메이션] 공통 스프링 설정 적용
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
};

export default DashboardItem;