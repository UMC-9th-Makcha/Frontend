export interface DashboardAction {
    id: string;
    title: string;
    description: string;
    path: string;
    variant: "primary" | "secondary";
  }
  
export const DASHBOARD_ACTIONS: DashboardAction[] = [
    {
      id: "create",
      title: "막차 알림\n생성하기",
      description: "막차 시간 알림을 생성하고,\n카카오톡으로 알림을 확인할 수 있어요",
      path: "/alarm",
      variant: "primary",
    },
    {
      id: "history",
      title: "알림 내역\n확인하기",
      description: "현재 신청한 알림과 과거 알림 신청\n내역을 확인할 수 있어요",
      path: "/history",
      variant: "secondary",
    },
  ];