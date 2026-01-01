import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DashboardProps } from '../../types/dashboard';
import { useAuth } from '../../hooks/useAuth';

const MobileHeader = ({ isOpen, setIsOpen }: DashboardProps) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-100 flex h-21 items-center justify-between px-5 
    bg-white dark:bg-makcha-navy-900 border-b border-gray-100 dark:border-makcha-navy-800 md:hidden">
      {/* 로고 */}
      <Link 
        to="/home"
        onClick={() => setIsOpen(false)} 
        className="absolute left-[12px] top-1/2 -translate-y-1/2"
      >
        <img
          src='makcha.png'
          alt="로고"
          className="w-[60px] h-[60px] rounded-xl object-cover"
        />
      </Link>
      
      {/* 유저 정보 */}
      <div className="ml-auto flex items-center space-x-3">
        <span className="text-sm font-semibold text-makcha-navy-800 dark:text-makcha-navy-200">
          {user?.nickname ?? '게스트'}님
        </span>
        
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="relative h-10 w-10 flex items-center justify-center text-makcha-navy-900 dark:text-white 
          transition-colors duration-300 focus:outline-none"
          aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={isOpen ? 'close' : 'menu'}
              initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 700, damping: 35 }}
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