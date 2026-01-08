import { ChevronRight } from "lucide-react";
import { UserIcon } from "../../../components/dashboard/UserIcon";
import { useAuth } from "../../../hooks/useAuth";
import type { SettingAccountProps } from "../../../types/setting";

export function SettingAccount({ onNavigate }: SettingAccountProps) {
  const { user, setLogout } = useAuth();

  return (
    <div className="mb-10 px-1">
      <p className="mb-4 text-[18px] font-semibold dark:text-white">계정</p>
      <p className="text-[20px] font-bold dark:text-white">{user?.nickname || "사용자"} 님</p>
      <div className="mt-2 flex items-center gap-2 text-gray-600 dark:text-makcha-navy-300">
        <UserIcon user={user} className="h-5 w-5" /> {user?.email || "example@email.com"}
      </div>
      
      <button 
        onClick={() => onNavigate('EDIT_CONTACT')} 
        className="group mt-4 flex w-full items-center justify-between border-t border-gray-50 pt-4 dark:border-makcha-navy-800"
      >
        <span className="text-gray-500 text-[15px]">연락처</span>
        <div className="flex items-center gap-1 dark:text-white font-medium">
          <span>010-1234-5678</span> <ChevronRight size={18} className="text-gray-300" />
        </div>
      </button>

      {/* 로그아웃 버튼 */}
      <button 
        onClick={() => setLogout()} 
        className={`
          mt-10 w-full rounded-xl py-4 font-medium transition-all
          border border-gray-400 text-gray-600 hover:bg-gray-50
          md:border-2 
          dark:border-white dark:text-white dark:hover:bg-white/10
        `}
      >
        로그아웃
      </button>
    </div>
  );
}