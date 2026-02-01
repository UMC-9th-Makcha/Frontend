import { ChevronRight } from "lucide-react";
import { UserIcon } from "../../../components/dashboard/components/UserIcon";
import { useAuth } from "../../../hooks/useAuth";
import type { AccountSectionProps } from "../types/setting";
import { useMemo } from "react";

export function AccountSection({ onNavigate }: AccountSectionProps) {
  const { user, logout, withdraw } = useAuth();

  const formattedPhone = useMemo(() => {
    if (!user?.phone) return "전화번호를 등록하세요";
    
    // 숫자만 추출
    const cleaned = user.phone.replace(/\D/g, "");

    return cleaned.replace(/^(\d{3})(\d{3,4})(\d{4})$/, "$1-$2-$3");
  }, [user]);

  return (
    <div className="mb-10 px-1">
      <p className="mb-4 text-[18px] font-semibold dark:text-white">계정</p>
      
      <div className="flex flex-col">
        <p className="text-[20px] font-bold dark:text-white">
          {user?.name || "사용자"} 님
        </p>
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600 dark:text-makcha-navy-300">
          <UserIcon user={user} className="h-5 w-5" />
          {user?.email || "example@email.com"}
        </div>
      </div>
      
      {/* 연락처 설정 바로가기 */}
      <button 
        onClick={() => onNavigate('EDIT_CONTACT')} 
        className="group mt-6 flex w-full items-center justify-between border-t border-gray-50 pt-4 dark:border-white/5"
      >
        <span className="text-gray-500 text-[15px]">연락처</span>
        <div className="flex items-center gap-1 font-medium dark:text-white">
          <span>{formattedPhone}</span> 
          <ChevronRight size={18} className="text-gray-300 transition-transform group-active:translate-x-1" />
        </div>
      </button>

      {/* 로그아웃 */}
      <button 
        onClick={() => logout()} 
        className="mt-10 w-full rounded-xl border border-gray-400 py-4 font-medium text-gray-600 transition-all hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-white/10"
      >
        로그아웃
      </button>

      {/* 회원 탈퇴 */}
      <button
        onClick={() => withdraw()}
        className="mt-10 w-full rounded-xl border border-gray-400 py-4 font-medium text-gray-600 transition-all hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-white/10"
      >
        회원 탈퇴
      </button>
    </div>
  );
}