import React, { memo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_MENUS, PUBLIC_MENU_IDS } from './constants';
import DashboardItem from './DashboardItem';
import { UserIcon } from './UserIcon';
import { useDashboardStore } from '../../store/useDashboardStore';
import { useAuth } from '../../hooks/useAuth';
import { useMediaQuery } from '../../store/useMediaQuery';
import type { DashboardNavProps } from '../../types/dashboard';

const DashboardNav = memo(({ dividerClass }: DashboardNavProps) => {
  const { user, isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const setSidebarOpen = useDashboardStore((state) => state.setSidebarOpen);

  const filteredMenus = isMobile ? NAV_MENUS.slice(4) : NAV_MENUS;

  const checkAccess = useCallback((menuId?: string) => {
    if (isLoggedIn) return true;
    if (menuId && (PUBLIC_MENU_IDS as readonly string[]).includes(menuId)) return true;
    return false;
  }, [isLoggedIn]);

  const handleNavClick = useCallback((e: React.MouseEvent, menuId: string) => {
    const hasAccess = checkAccess(menuId);

    if (!hasAccess) {
      e.preventDefault();
      if (location.pathname !== "/") navigate("/");
      return;
    }

    setSidebarOpen(false);
  }, [checkAccess, location.pathname, navigate, setSidebarOpen]);

  return (
    <nav className="flex-1 overflow-y-auto no-scrollbar mt-2 flex flex-col gap-y-1">
      {/* 유저 정보 연동 부분 */}
      {isLoggedIn && user && (
        <React.Fragment>
          <DashboardItem
            label={`${user.name}님`}
            path="/setting"
            icon={({ className }: { className?: string }) => (
              <UserIcon user={user} className={className} />
            )}
            onClick={(e) => handleNavClick(e, 'setting')}
            isStatic
          />
          <div className={dividerClass} />
        </React.Fragment>
      )}

      {/* 메뉴 렌더링 */}
      {filteredMenus.map((menu) => (
        <React.Fragment key={menu.id}>
          {menu.divider && <div className={dividerClass} />}
          <DashboardItem
            label={menu.label}
            path={menu.path}
            icon={menu.icon}
            onClick={(e) => handleNavClick(e, menu.id)}
          />
        </React.Fragment>
      ))}
    </nav>
  );
});

DashboardNav.displayName = 'DashboardNav';
export default DashboardNav;