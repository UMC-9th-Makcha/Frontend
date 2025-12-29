import { NavLink } from 'react-router-dom';
import type { DashboardItemProps } from '../../types/dashboard';

const DashboardItem = ({ label, path, icon: Icon, onClick, isStatic = false }: DashboardItemProps) => {
  
  // 공통 아이콘/텍스트 스타일 레이아웃
  const renderContent = (isActive: boolean) => (
    <>
      {/* 아이콘 컨테이너 */}
      <div className="flex items-center justify-center shrink-0 w-9 h-9 md:w-7 md:h-7">
        <Icon
          className={`
            transition-colors duration-300 w-full h-full stroke-[2px]
            ${isActive 
              ? 'text-makcha-navy-900 dark:text-white'
              : 'text-gray-400 group-hover:text-gray-700 dark:group-hover:text-makcha-navy-200' 
            }
          `}
        />
      </div>
      
      {/* 텍스트 컨테이너 */}
      <span
        className={`  
          ml-5 leading-none whitespace-nowrap text-[24px] md:text-[16px] transition-colors duration-300
          ${isActive 
            ? 'text-makcha-navy-900 dark:text-white font-bold'
            : 'text-gray-400 dark:text-gray-500 font-medium'
          }
        `}
      >
        {label}
      </span>
    </>
  );

  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={`
        group flex items-center px-9 h-[60px] md:h-12 transition-all duration-300
        hover:bg-gray-50/50 
        dark:hover:bg-makcha-navy-800/50
      `}
    >
      {({ isActive }) => renderContent(isStatic ? false : isActive)}
    </NavLink>
  );
};

export default DashboardItem;