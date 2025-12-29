import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DashboardProps } from '../../types/dashboard';

const MobileHeader = ({ isOpen, setIsOpen }: DashboardProps) => {
  return (
    <header className="sticky top-0 z-100 flex h-21 items-center justify-between px-5 bg-white border-b border-gray-100 md:hidden">
      {/* 로고 */}
      <Link 
        to="/" 
        onClick={() => setIsOpen(false)} 
        className="absolute left-[12px] top-1/2 -translate-y-1/2"
      >
        <img
          src="https://placehold.co/64x64/png"
          alt="로고"
          className="w-[60px] h-[60px] rounded-xl object-cover"
        />
      </Link>
      
      {/* ml-auto로 우측 정렬 유지 */}
      <div className="ml-auto flex items-center space-x-3">
        <span className="text-sm font-semibold text-makcha-navy-800">서막차님</span>
        
        {/* 애니메이션 버튼 컨테이너 */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="relative h-10 w-10 flex items-center justify-center text-makcha-navy-900 focus:outline-none"
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