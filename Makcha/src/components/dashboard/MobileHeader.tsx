import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DashboardProps } from '../../types/dashboard';
import { useAuth } from '../../hooks/useAuth';

const MobileHeader = ({ isOpen, setIsOpen }: DashboardProps) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-[100] flex h-20 w-full items-center justify-between px-5 
    bg-white dark:bg-makcha-navy-900 border-b border-gray-100 dark:border-makcha-navy-800 md:hidden overflow-hidden">
      {/* 로고 영역 - absolute 대신 정렬로 처리하는 게 더 안전함 */}
      <div className="flex items-center">
        <Link 
          to="/home"
          onClick={() => setIsOpen(false)} 
          className="flex items-center"
        >
          <img
            src='/makcha.png'
            alt="로고"
            className="w-[50px] h-[50px] rounded-xl object-cover" // 60px에서 50px로 살짝 조절
          />
        </Link>
      </div>
      
      {/* 유저 정보 및 메뉴 버튼 */}
      <div className="flex items-center space-x-3">
        <span className="text-sm font-semibold text-makcha-navy-800 dark:text-makcha-navy-200">
          {user?.nickname ?? '게스트'}님
        </span>
        
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="relative h-10 w-10 flex items-center justify-center text-makcha-navy-900 dark:text-white 
          focus:outline-none"
          aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={isOpen ? 'close' : 'menu'}
              initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
              className="absolute"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>
    </header>
  );
};
export default MobileHeader;