import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoadingSpinner from "../common/loadingSpinner";
import { useAuth } from "../../hooks/useAuth";
import { useAuthStore } from "../../store/useAuthStore";

/**
 * 🔐 ProtectedRoute
 */
export const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  
  // 하이드레이션 체크 (Zustand persist 동기화 대기)
  const isHydrated = useAuthStore.persist.hasHydrated();

  if (!isHydrated) return <LoadingSpinner />; 

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

/**
 * 🔓 PublicRoute
 */
export const PublicRoute = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const isHydrated = useAuthStore.persist.hasHydrated();

  if (!isHydrated) return null;

  // 이미 로그인된 유저가 메인에 접근하면, 가려던 곳이 있다면 그곳으로, 없으면 홈으로
  const from = location.state?.from?.pathname || "/home";
  
  return isLoggedIn ? <Navigate to={from} replace /> : <Outlet />;
};