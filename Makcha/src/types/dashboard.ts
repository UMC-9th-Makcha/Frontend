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