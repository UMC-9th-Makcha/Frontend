import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LoginPanel from "./components/MainPanel";
import MainBg from "./components/MainBg";

export default function Main() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="h-full w-full flex flex-row justify-between
     transition-colors duration-200 bg-white dark:bg-makcha-navy-900 overflow-x-hidden">
      <LoginPanel />
      <MainBg />
    </div>
  );
}