import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";


export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon | ComponentType<{ className?: string }>;
  divider?: boolean;
}

export interface DashboardProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

export interface DashboardItemProps {
  label: string;
  path: string;
  icon: LucideIcon | ComponentType<{ className?: string }>;
  onClick: () => void;
  isStatic?: boolean;
}