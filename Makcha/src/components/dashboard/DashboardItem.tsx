// src/components/dashboard/DashboardItem.tsx
import { NavLink } from 'react-router-dom';
// 'verbatimModuleSyntax' 대응: 타입은 반드시 import type으로!
import type { LucideIcon } from 'lucide-react';

interface DashboardItemProps {
  label: string;
  path: string;
  icon: LucideIcon;
  onClick: () => void;
}

const DashboardItem = ({ label, path, icon: Icon, onClick }: DashboardItemProps) => {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      className="group flex items-center space-x-4 px-4 py-3.5 transition-colors"
    >
      {({ isActive }) => (
        <>
          <Icon
            size={22}
            className={`transition-colors duration-200 ${
              isActive ? 'text-makcha-navy-800' : 'text-gray-400 group-hover:text-gray-600'
            }`}
          />
          <span
            className={`text-[15px] tracking-tight transition-colors duration-200 ${
              isActive
                ? 'text-makcha-navy-900 font-extrabold'
                : 'text-gray-500 font-semibold group-hover:text-gray-700'
            }`}
          >
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
};

export default DashboardItem;