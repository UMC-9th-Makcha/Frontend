import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Setting() {
  const navigate = useNavigate();

  const { setLogout } = useAuth();

  const handleLogout = () => {
    if (!window.confirm('로그아웃 하시겠습니까?')) return;

    setLogout();

    navigate('/', { replace: true });
  };

  const menuList = [
    { label: '프로필 수정', onClick: () => navigate('/setting/profile') },
    { label: '알림 소리 설정', onClick: () => {} },
    { label: '테마 변경', onClick: () => {} },
    { label: '로그아웃', onClick: handleLogout, isDanger: true },
  ];

  return (
    <div className="p-4 bg-white dark:bg-makcha-navy-900 min-h-screen">
      <h1 className="text-xl font-bold mb-6 dark:text-white">환경 설정</h1>
      <ul className="space-y-1">
        {menuList.map((menu) => (
          <li
            key={menu.label}
            onClick={menu.onClick}
            className="py-4 border-b border-gray-100 dark:border-makcha-navy-800 flex justify-between items-center cursor-pointer active:opacity-50 transition-opacity"
          >
            <span className={menu.isDanger ? 'text-red-400 font-medium' : 'dark:text-makcha-navy-200'}>
              {menu.label}
            </span>
            <span className="text-gray-300 dark:text-makcha-navy-700 text-lg">›</span>
          </li>
        ))}
      </ul>
    </div>
  );
}