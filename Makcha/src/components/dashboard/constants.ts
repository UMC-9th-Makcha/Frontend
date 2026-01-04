import { 
    LayoutDashboard, 
    AlarmClock, 
    Moon, 
    History, 
    Settings, 
    Download 
  } from 'lucide-react';
  import type { MenuItem } from '../../types/dashboard';
  
  export const NAV_MENUS: MenuItem[] = [
    { id: 'home', label: '대시보드', path: '/home', icon: LayoutDashboard },
    { id: 'alarm', label: '막차 알림 생성', path: '/alarm', icon: AlarmClock },
    { id: 'spot', label: '첫차 대기 장소', path: '/spot/first', icon: Moon },
    { id: 'history', label: '알림 내역', path: '/history', icon: History, divider: true },
    { id: 'setting', label: '환경 설정', path: '/setting', icon: Settings },
    { id: 'download', label: '막차 앱 다운로드', path: '/download', icon: Download },
  ];

  export const PUBLIC_MENU_IDS = ['home', 'download'];

  export const sidebarSpring = {
    type: "spring",
    stiffness: 400,
    damping: 40,
    restDelta: 0.001
  } as const;;