import { useMemo, useCallback, memo } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_MENUS, PUBLIC_MENU_IDS } from '../constants';
import { useDashboardStore } from '../../../store/useDashboardStore';
import { useAuth } from '../../../hooks/useAuth';

const TABS = NAV_MENUS.slice(0, 4);

const MobileNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const isSidebarOpen = useDashboardStore(state => state.isSidebarOpen);
  const setSidebarOpen = useDashboardStore(state => state.setSidebarOpen);

  const isTab = useMemo(() => TABS.some(t => t.path === pathname), [pathname]);
  const menuOn = useMemo(() => isSidebarOpen || !isTab, [isSidebarOpen, isTab]);

  const closeSidebar = useCallback(() => setSidebarOpen(false), [setSidebarOpen]);
  const toggleSidebar = useCallback(() => setSidebarOpen(!isSidebarOpen), [isSidebarOpen, setSidebarOpen]);

  const checkAccess = useCallback((menuId?: string) => {
    if (isLoggedIn) return true;
    return !!menuId && (PUBLIC_MENU_IDS as readonly string[]).includes(menuId);
  }, [isLoggedIn]);

  const handleTabClick = useCallback((e: React.MouseEvent, menuId: string) => {
    if (!checkAccess(menuId)) {
      e.preventDefault(); 
      if (pathname !== "/") {
        navigate("/");
      }
      return;
    }
    closeSidebar();
  }, [checkAccess, pathname, navigate, closeSidebar]);

  return (
    <nav className="relative w-full shrink-0 h-16 bg-white dark:bg-makcha-navy-900 border-t border-gray-100 dark:border-makcha-navy-800 flex items-center justify-around z-50 md:hidden">
      {TABS.map((t) => (
        <NavLink
          key={t.id}
          to={t.path}
          onClick={(e) => handleTabClick(e, t.id)}
          className={({ isActive }) => {
            const on = !isSidebarOpen && isActive;
            return `flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
              on 
                ? "bg-gray-100 dark:bg-makcha-navy-800"
                : "bg-transparent"
            }`;
          }}
        >
          {({ isActive }) => {

            const on = !isSidebarOpen && isActive;
            const colorClass = on 
              ? "text-makcha-navy-600 dark:text-white font-bold" 
              : "text-gray-400 dark:text-gray-500 font-medium";

            return (
              <>
                <t.icon size={24} className={`transition-colors duration-200 ${colorClass}`} />
                <span className={`text-caption mt-1 transition-colors duration-200 ${colorClass}`}>
                  {t.label}
                </span>
              </>
            );
          }}
        </NavLink>
      ))}
      
      <button 
        onClick={toggleSidebar} 
        className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 appearance-none outline-none ${
          menuOn 
            ? "bg-gray-100 dark:bg-makcha-navy-800"
            : "bg-transparent"
        }`}
      >
        {(() => {
          const colorClass = menuOn 
            ? "text-makcha-navy-600 dark:text-white font-bold" 
            : "text-gray-400 dark:text-gray-500 font-medium";
            
          return (
            <>
              <div className={`relative h-6 w-6 flex items-center justify-center transition-colors duration-200 ${colorClass}`}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={isSidebarOpen ? 'close' : 'menu'}
                    initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                    transition={{ duration: 0.15, ease: "easeInOut" }}
                    className="absolute flex items-center justify-center"
                  >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <span className={`text-caption mt-1 transition-colors duration-200 ${colorClass}`}>
                {isSidebarOpen ? '닫기' : '메뉴'}
              </span>
            </>
          );
        })()}
      </button>
    </nav>
  );
};

export default memo(MobileNav);