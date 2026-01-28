import { ChevronRight } from "lucide-react";
import { UserIcon } from "../../../components/dashboard/UserIcon";
import { useAuth } from "../../../hooks/useAuth";
import type { AccountSectionProps } from "../../../types/setting";

export function AccountSection({ onNavigate }: AccountSectionProps) {
  const { user, logout } = useAuth();

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
          <span>010-1234-5678</span> 
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
    </div>
  );
}