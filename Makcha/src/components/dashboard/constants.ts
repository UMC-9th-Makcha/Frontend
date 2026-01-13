import { LayoutDashboard, AlarmClock, Moon, History, Settings, Download } from 'lucide-react';
import type { MenuItem } from '../../types/dashboard';

export const NAV_MENUS: readonly MenuItem[] = [
  { id: 'home', label: '대시보드', path: '/home', icon: LayoutDashboard },
  { id: 'alarm', label: '알림 생성', path: '/alarm', icon: AlarmClock },
  { id: 'spot', label: '대기 장소', path: '/spot/first', icon: Moon },
  { id: 'history', label: '알림 내역', path: '/history', icon: History, divider: true },
  { id: 'setting', label: '환경 설정', path: '/setting', icon: Settings },
  { id: 'download', label: '다운로드', path: '/download', icon: Download },
] as const;

export const PUBLIC_MENU_IDS = ['home', 'download'] as const;

export const sidebarSpring = {
  type: "spring",
  stiffness: 500,
  damping: 50,
  mass: 1,
  restDelta: 0.01,
  restSpeed: 0.01,
} as const;

export const toggleVariants = {
  expanded: (isDarkMode: boolean) => ({
    width: 44,
    height: 24,
    backgroundColor: isDarkMode ? '#1e293b' : '#e5e7eb',
    borderColor: 'rgba(209, 213, 219, 0.2)',
  }),
  collapsed: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: 'rgba(0,0,0,0)',
  },
};