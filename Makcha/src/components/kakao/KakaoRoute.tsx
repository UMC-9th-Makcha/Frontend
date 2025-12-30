import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

/**
 * ProtectedRoute: 로그인한 사용자만 접근 가능
 * 로그인 안 된 유저가 접근 시 메인(/)으로 리다이렉트
 */
export const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

/**
 * PublicRoute: 로그인 안 한 사용자만 접근 가능
 * 이미 로그인된 유저가 메인(/) 접근 시 홈(/home)으로 리다이렉트
 */
export const PublicRoute = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/home" replace /> : <Outlet />;
};