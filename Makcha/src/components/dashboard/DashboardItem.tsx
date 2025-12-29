import { NavLink } from 'react-router-dom';
import type { DashboardItemProps } from '../../types/dashboard';

const DashboardItem = ({ label, path, icon: Icon, onClick, isStatic = false }: DashboardItemProps) => {
  
  // 공통 아이콘/텍스트 스타일 레이아웃
  const renderContent = (isActive: boolean) => (
    <>
      {/* 아이콘 컨테이너: 크기를 고정하여 텍스트 시작 위치를 통일 */}
      <div className="flex items-center justify-center shrink-0 w-9 h-9 md:w-7 md:h-7">
        <Icon
          className={`
            transition-colors duration-200 w-full h-full stroke-[2px]
            ${isActive ? 'text-makcha-navy-900' : 'text-gray-400 group-hover:text-gray-700'}
          `}
        />
      </div>
      <span
        className={`  
          ml-5 leading-none whitespace-nowrap text-[22px] md:text-[15px]
          ${isActive ? 'text-makcha-navy-900 font-bold' : 'text-gray-400 font-medium'}
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
      /* isStatic일 때는 호버 효과만 남기고 NavLink 기능 비활성화 */
      className="group flex items-center px-9 h-[60px] md:h-12 transition-colors hover:bg-gray-50/50"
    >
      {/* 핵심: isStatic이면 false, 아니면 NavLink의 isActive 사용 */}
      {({ isActive }) => renderContent(isStatic ? false : isActive)}
    </NavLink>
  );
};

export default DashboardItem;