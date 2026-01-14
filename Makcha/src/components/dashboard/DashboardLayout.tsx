import { Outlet } from "react-router-dom";
import Dashboard from "./index";
import MobileNav from "./MobileNav";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col w-full h-dvh bg-white dark:bg-makcha-navy-900 overflow-hidden">

      <div className="flex-1 flex min-h-0 w-full relative">
        <Dashboard /> 

        <main className="flex-1 min-w-0 overflow-y-auto no-scrollbar relative">
          <Outlet />
        </main>
      </div>

      <footer className="shrink-0 w-full border-t border-gray-100 dark:border-makcha-navy-800">
        <MobileNav />
      </footer>
    </div>
  );
};

export default DashboardLayout;