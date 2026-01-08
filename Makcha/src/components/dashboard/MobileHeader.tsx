import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DashboardProps } from '../../types/dashboard';
import { useAuth } from '../../hooks/useAuth';

const MobileHeader = ({ isOpen, setIsOpen }: DashboardProps) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-48 flex h-16 w-full items-center justify-between px-4 
      bg-white dark:bg-makcha-navy-900 border-b border-gray-100 dark:border-makcha-navy-800 
      md:hidden overflow-hidden">
      
      {/* 로고 영역 */}
      <div className="flex items-center">
        <Link 
          to={user ? "/home" : "/"}
          onClick={() => setIsOpen(false)} 
          className="flex items-center"
        >
          <img
            src='/makcha.png'
            alt="로고"
            className="w-10 h-10 rounded-lg object-cover"
          />
        </Link>
      </div>

      <div className="flex items-center space-x-3">
        <span className="text-xs font-semibold text-makcha-navy-800 dark:text-makcha-navy-200">
          {user?.nickname ?? '게스트'}님
        </span>
        
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="relative h-9 w-9 flex items-center justify-center text-makcha-navy-900 dark:text-white 
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
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;