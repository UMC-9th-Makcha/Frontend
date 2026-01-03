import React from 'react';
import { NAV_MENUS } from './constants';
import DashboardItem from './DashboardItem';
import { UserIcon } from './UserIcon';
import type { DashboardNavProps } from '../../types/dashboard';

const DashboardNav = ({ user, onItemClick, dividerClass, isCollapsed }: DashboardNavProps) => {
  return (
    <nav className="flex-1 overflow-y-auto no-scrollbar mt-2 flex flex-col gap-y-1">
      {/* 프로필 */}
      {user && (
        <>
          <DashboardItem
            label={`${user.nickname}님`}
            path="/setting"
            icon={({ className }: { className?: string }) => (
              <UserIcon user={user} className={className} />
            )}
            onClick={onItemClick}
            isStatic
            isCollapsed={isCollapsed}
          />
          <div className={dividerClass} />
        </>
      )}

      {/* 메뉴 */}
      {NAV_MENUS.map((menu) => (
        <React.Fragment key={menu.id}>
          {/* 메뉴 데이터에 divider 설정이 있는 경우 구분선 표시 */}
          {menu.divider && <div className={dividerClass} />}
          <DashboardItem
            label={menu.label}
            path={menu.path}
            icon={menu.icon}
            onClick={onItemClick}
            isCollapsed={isCollapsed}
          />
        </React.Fragment>
      ))}
    </nav>
  );
};

export default DashboardNav;