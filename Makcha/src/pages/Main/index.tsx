import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LoginPanel from "./MainPanel";
import HeroSection from "./MainBg";

export default function Main() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="flex min-h-screen transition-colors duration-200 bg-white dark:bg-makcha-navy-900 overflow-x-hidden">
      <LoginPanel />
      <HeroSection />
    </div>
  );
}