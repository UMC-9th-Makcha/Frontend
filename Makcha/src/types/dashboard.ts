import type { LucideIcon } from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  divider?: boolean;
}

export interface DashboardProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

export interface DashboardItemProps {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }> | LucideIcon;
  onClick: () => void;
  isStatic?: boolean; // 활성화 효과를 끄는 옵션
}