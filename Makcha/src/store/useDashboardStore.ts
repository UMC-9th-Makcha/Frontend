import { create } from 'zustand';

interface DashboardState {
  isSidebarOpen: boolean; // 모바일
  isSidebarCollapsed: boolean; // 데스크탑
  setSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapsed: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  isSidebarOpen: false,
  isSidebarCollapsed: false,
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  toggleSidebarCollapsed: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
}));