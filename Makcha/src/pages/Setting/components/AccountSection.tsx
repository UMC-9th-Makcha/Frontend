import { useMemo, memo, useCallback } from "react";
import { ChevronRight } from "lucide-react";
import { UserIcon } from "../../../components/dashboard/components/UserIcon";
import { useAuth } from "../../../hooks/useAuth";
import type { AccountSectionProps } from "../types/setting";

const dangerButtonStyle = "mt-4 w-full rounded-xl border border-gray-400 py-4 text-h3 font-bold text-gray-600 transition-all hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-white/10";

export const AccountSection = memo(({ onNavigate }: AccountSectionProps) => {
  const { user, logout, withdraw, isWithdrawing } = useAuth();

  const userPhone = user?.phone;
  const userName = user?.name;
  const userEmail = user?.email;

  const formattedPhone = useMemo(() => {
    if (!userPhone) return "전화번호를 등록하세요";
    const cleaned = userPhone.replace(/\D/g, "");
    return cleaned.replace(/^(\d{3})(\d{3,4})(\d{4})$/, "$1-$2-$3");
  }, [userPhone]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleWithdraw = useCallback(async () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?\n탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.")) {
      try {
        await withdraw();
      } catch {
        logout();
      }
    }
  }, [withdraw, logout]);

  return (
    <div className="mb-10 px-1">
      <p className="mb-4 text-h2 font-semibold dark:text-white">계정</p>

      {/* 이름 & 이메일 */}
      <div className="flex items-center justify-between w-full py-5">
        <p className="text-h3 font-bold dark:text-white shrink-0">
          {userName || "사용자"}님
        </p>
        <div className="flex items-center gap-2 text-body text-gray-500 dark:text-makcha-navy-300 min-w-0">
          <UserIcon user={user} className="h-5 w-5 shrink-0" />
          <span className="truncate max-w-[150px] sm:max-w-[200px] md:max-w-none text-right">
            {userEmail || "이메일 정보 없음"}
          </span>
        </div>
      </div>

      {/* 연락처 */}
      <button 
        type="button"
        onClick={() => onNavigate('EDIT_CONTACT')} 
        className="group flex w-full items-center justify-between border-t border-gray-100 dark:border-white/5 py-5 transition-all active:bg-gray-50 dark:active:bg-white/5"
      >
        <span className="text-h3 font-bold dark:text-white">연락처</span>
        <div className="flex items-center gap-1 font-medium text-body text-gray-500 dark:text-makcha-navy-300">
          <span>{formattedPhone}</span> 
          <ChevronRight size={18} className="text-gray-300 transition-transform group-active:translate-x-1" />
        </div>
      </button>

      {/* 버튼 영역 */}
      <div className="mt-8 flex flex-col gap-2">
        <button 
          type="button"
          onClick={handleLogout} 
          className={dangerButtonStyle}
        >
          로그아웃
        </button>
        <button 
          type="button"
          onClick={handleWithdraw} 
          disabled={isWithdrawing}
          className={`${dangerButtonStyle} disabled:opacity-50`}
        >
          {isWithdrawing ? "탈퇴 처리 중..." : "회원 탈퇴"}
        </button>
      </div>
    </div>
  );
});

AccountSection.displayName = 'AccountSection';