import { memo, useMemo } from 'react';
import { useUIStore } from '../../../store/useUIStore';
import { motion, AnimatePresence } from 'framer-motion';
import { sidebarSpring, toggleVariants } from '../constants';

const DarkModeToggle = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const toggleDarkMode = useUIStore((state) => state.toggleDarkMode);

  const toggleTransition = useMemo(() => ({
    ...sidebarSpring,
    backgroundColor: { duration: 0 }, 
    borderColor: { duration: 0 },
  }), []);

  return (
    <div className={`flex items-center h-12 w-full ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
      
      {/* 토글 배경 */}
      <motion.button
        layout
        onClick={toggleDarkMode}
        custom={isDarkMode}
        variants={toggleVariants}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        transition={toggleTransition}
        className={`
          relative flex items-center shrink-0 rounded-full border overflow-hidden
          ${isCollapsed ? 'justify-center' : (isDarkMode ? 'justify-end px-1' : 'justify-start px-1')}
        `}
      >
        {/* 아이콘 */}
        <motion.span
          layout
          transition={sidebarSpring}
          className={`
            relative rounded-full transition-shadow duration-300
            ${isCollapsed ? 'w-7 h-7' : 'w-[18px] h-[18px]'}
            ${isDarkMode 
              ? 'bg-transparent shadow-[inset_-9px_-3px_0_0_#fde047] -rotate-15' 
              : 'bg-makcha-yellow-500'
            }
          `}
        />
      </motion.button>

      {/* 텍스트 */}
      <AnimatePresence mode="popLayout">
        {!isCollapsed && (
          <motion.span
            key="darkmode-text"
            layout
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={sidebarSpring}
            className="ml-4 text-body font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap"
          >
            다크모드
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(DarkModeToggle);