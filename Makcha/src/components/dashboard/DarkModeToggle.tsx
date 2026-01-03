import { useUIStore } from '../../store/useUIStore';
import { motion, AnimatePresence } from 'framer-motion';
import { sidebarSpring } from './constants';

const DarkModeToggle = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const { isDarkMode, toggleDarkMode } = useUIStore();

  // 토글 배경 상태별 스타일
  const trackVariants = {
    expanded: {
      width: 44,
      height: 24,
      backgroundColor: isDarkMode ? '#0f172a' : '#e5e7eb',
      borderColor: 'rgba(209, 213, 219, 0.2)',
    },
    collapsed: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgba(0,0,0,0)',
    },
  };

  return (
    <div className={`flex items-center h-12 w-full ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
      
      {/* 배경 */}
      <motion.button
        layout // [애니메이션] 레이아웃 변화 자동 감지
        onClick={toggleDarkMode}
        variants={trackVariants}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        transition={{
          ...sidebarSpring, // [애니메이션] 공통 스프링 설정 적용
          backgroundColor: { duration: 0 }, // 배경색/테두리는 즉시 변경
          borderColor: { duration: 0 },
        }}
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
              ? 'bg-transparent shadow-[inset_-6px_-2px_0_0_#fde047] -rotate-15' 
              : 'bg-yellow-400'
            }
          `}
        />
      </motion.button>

      {/* 다크모드 */}
      <AnimatePresence mode="popLayout">
        {!isCollapsed && (
          <motion.span
            key="darkmode-text"
            layout // [애니메이션] 아이콘 이동 속도와 동기화
            initial={{ opacity: 0, x: -10 }} // [애니메이션] 시작 상태
            animate={{ opacity: 1, x: 0 }}    // [애니메이션] 등장 상태
            exit={{ opacity: 0, x: -10 }}     // [애니메이션] 퇴장 상태
            transition={sidebarSpring} // [애니메이션] 공통 스프링 설정 적용
            className="ml-4 text-[15px] font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap"
          >
            다크모드
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DarkModeToggle;