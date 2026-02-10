import React, { memo, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { NAV_MENUS, PUBLIC_MENU_IDS } from '../constants';
import DashboardItem from './DashboardItem';
import { UserIcon } from './UserIcon';
import { useDashboardStore } from '../../../store/useDashboardStore';
import { useAuth } from '../../../hooks/useAuth';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import type { DashboardNavProps } from '../types/dashboard';

const DashboardNav = memo(({ dividerClass }: DashboardNavProps) => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const setSidebarOpen = useDashboardStore(state => state.setSidebarOpen);

  const filteredMenus = useMemo(() => 
    isMobile ? NAV_MENUS.slice(4) : NAV_MENUS, 
  [isMobile]);

  const checkAccess = useCallback((menuId?: string) => {
    if (isLoggedIn) return true;
    return !!menuId && (PUBLIC_MENU_IDS as readonly string[]).includes(menuId);
  }, [isLoggedIn]);

  const handleNavClick = useCallback((e: React.MouseEvent, menuId: string) => {
    const hasAccess = checkAccess(menuId);

    if (!hasAccess) {
      e.preventDefault();
      if (window.location.pathname !== "/") navigate("/");
      return;
    }

    setSidebarOpen(false);
  }, [checkAccess, navigate, setSidebarOpen]);

  const renderUserIcon = useCallback(({ className }: { className?: string }) => (
    <UserIcon user={user} className={className} />
  ), [user]);

  return (
    <nav className="flex-1 overflow-y-auto no-scrollbar mt-2 flex flex-col gap-y-1">
      {isLoggedIn && user && (
        <React.Fragment>
          <DashboardItem
            label={`${user.name}님`}
            path="/setting"
            icon={renderUserIcon}
            onClick={(e) => handleNavClick(e, 'setting')}
            isStatic
          />
          <div className={dividerClass} />
        </React.Fragment>
      )}

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