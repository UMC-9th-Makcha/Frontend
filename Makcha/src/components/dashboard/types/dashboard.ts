import type { LucideIcon } from "lucide-react";
import type { ComponentType, ElementType } from "react";

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
  dividerClass: string;
}

export interface DashboardItemProps {
  label: string;
  path: string;
  icon: IconType;
  onClick?: (e: React.MouseEvent) => void;
  isStatic?: boolean;
}

export interface IconProps {
  className?: string;
}