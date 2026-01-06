import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_MENUS, PUBLIC_MENU_IDS } from './constants';
import DashboardItem from './DashboardItem';
import { UserIcon } from './UserIcon';
import type { DashboardNavProps } from '../../types/dashboard';

const DashboardNav = ({ user, onItemClick, dividerClass, isCollapsed }: DashboardNavProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!user;

  const checkAccess = (menuId?: string) => {
    if (isLoggedIn) return true;
    if (menuId && PUBLIC_MENU_IDS.includes(menuId)) return true;
    return false;
  };

  const handleNavClick = (e: React.MouseEvent, menuId?: string) => {
    const hasAccess = checkAccess(menuId);

    if (!hasAccess) {
      e.preventDefault(); 
      if (location.pathname !== "/") {
        navigate("/");
      }
      return;
    }

    onItemClick?.(); 
  };

  return (
    <nav className="flex-1 overflow-y-auto no-scrollbar mt-2 flex flex-col gap-y-1">
      {user && (
        <>
          <DashboardItem
            label={`${user.nickname}님`}
            path="/setting"
            icon={({ className }: { className?: string }) => (
              <UserIcon user={user} className={className} />
            )}
            onClick={(e) => handleNavClick(e, 'setting')} 
            isStatic
            isCollapsed={isCollapsed}
          />
          <div className={dividerClass} />
        </>
      )}

      {NAV_MENUS.map((menu) => (
        <React.Fragment key={menu.id}>
          {menu.divider && <div className={dividerClass} />}
          <DashboardItem
            label={menu.label}
            path={menu.path}
            icon={menu.icon}
            onClick={(e) => handleNavClick(e, menu.id)} 
            isCollapsed={isCollapsed}
          />
        </React.Fragment>
      ))}
    </nav>
  );
};

export default DashboardNav;