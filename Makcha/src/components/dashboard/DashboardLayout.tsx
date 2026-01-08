import { Outlet } from "react-router-dom";
import Dashboard from "./index";
import MobileHeader from "./MobileHeader";

const DashboardLayout = () => {
  return (
    <div className="flex w-full h-dvh bg-white dark:bg-makcha-navy-900 overflow-hidden">
      <Dashboard />

      <div className="flex-1 flex flex-col min-w-0 h-full">
        <MobileHeader />
        <main className="flex-1 w-full overflow-hidden bg-gray-50/30 dark:bg-transparent">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;