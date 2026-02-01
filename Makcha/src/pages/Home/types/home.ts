export interface DashboardAction {
    id: string;
    title: string;
    description: string;
    path: string;
    variant: "primary" | "secondary";
  }