import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAuthStore } from "../../store/useAuthStore";

//🔐 ProtectedRoute (로그인 필수)
export const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const isHydrated = useAuthStore.persist.hasHydrated();

  if (!isHydrated) return null;

  if (!isLoggedIn) {
    // 이미 메인에 있다면 추가 이동이나 리로드 없이 null 반환
    if (location.pathname === "/") return null;
    
    // 메인이 아닌 다른 경로에서 접근했다면 메인으로 이동
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

//🔓 PublicRoute (로그인 시 접근 불가)
export const PublicRoute = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const isHydrated = useAuthStore.persist.hasHydrated();

  if (!isHydrated) return null;

  const from = location.state?.from?.pathname || "/home";
  
  return isLoggedIn ? <Navigate to={from} replace /> : <Outlet />;
};