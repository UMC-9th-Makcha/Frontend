import type { LucideIcon } from "lucide-react";
import type { ComponentType, ElementType } from "react";
import type { User } from "./auth";

type IconType = LucideIcon | ComponentType<{ className?: string }> | ElementType;

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: IconType;
  divider?: boolean;
}

export interface DashboardProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export interface DashboardNavProps {
  user: User | null;
  onItemClick: () => void;
  dividerClass: string;
  isCollapsed: boolean;
}

export interface DashboardItemProps {
  label: string;
  path: string;
  icon: IconType;
  onClick?: (e: React.MouseEvent) => void;
  isStatic?: boolean;
  isCollapsed?: boolean;
}

export interface DashboardNavProps {
  user: User | null;
  onItemClick: () => void;
  dividerClass: string;
  isCollapsed: boolean;
}