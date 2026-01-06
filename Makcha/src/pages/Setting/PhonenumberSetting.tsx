import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { PhonenumberSettingProps } from "../../types/setting";
import SubPanel from "../../components/common/Panel/SubPanel";

export default function PhonenumberSetting({ onBack }: PhonenumberSettingProps) {
  const [phone, setPhone] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [timer, setTimer] = useState(0);

  // 전화번호 포맷팅 로직
  const handlePhoneChange = (val: string) => {
    const nums = val.replace(/\D/g, "");
    let formatted = "";
    if (nums.length <= 3) formatted = nums;
    else if (nums.length <= 7) formatted = `${nums.slice(0, 3)}-${nums.slice(3)}`;
    else formatted = `${nums.slice(0, 3)}-${nums.slice(3, 7)}-${nums.slice(7, 11)}`;
    setPhone(formatted);
  };

  // 타이머 로직
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const requestAuthCode = () => {
    setIsSent(true);
    setTimer(180);
  };

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <SubPanel
      isOpen={true} 
      onBack={onBack} 
      title="연락처 변경"
      rightAction={
        <button 
          onClick={onBack} 
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
      }
    >
      <div className="flex flex-col h-full">
        <div className="space-y-6 flex-1">
          <div>
            <label className="text-xs font-bold uppercase mb-3 block text-gray-500 dark:text-makcha-navy-300">
              새로운 전화번호
            </label>
            
            <div className="relative flex items-center">
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                maxLength={13}
                placeholder="010-0000-0000" 
                className="w-full p-4 pr-[110px] border border-gray-200 rounded-xl outline-none bg-transparent text-gray-900 dark:border-white/10 dark:text-white focus:border-blue-500 transition-colors placeholder:text-gray-300" 
              />
              
              <button 
                type="button"
                onClick={requestAuthCode}
                disabled={phone.length < 12 || isSent}
                className={`
                  absolute right-2 px-3 py-2 rounded-lg text-[12px] font-bold transition-all
                  border border-gray-400 text-gray-600 hover:bg-gray-50
                  dark:border-white/40 dark:text-white dark:hover:bg-white/10
                  disabled:opacity-30 disabled:cursor-not-allowed
                  ${isSent ? 'border-blue-500 text-blue-500 dark:border-blue-400 dark:text-blue-400' : ''}
                `}
              >
                {isSent ? "재발송" : "인증 요청"}
              </button>
            </div>
          </div>

          <div className="relative">
            <input 
              type="text" 
              placeholder="인증번호 6자리 입력" 
              className="w-full p-4 rounded-xl outline-none transition-all ring-blue-500/50 focus:ring-1 bg-gray-100 dark:bg-makcha-navy-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-makcha-navy-500" 
            />
            {isSent && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 font-mono font-bold">
                {formatTime(timer)}
              </span>
            )}
          </div>
          
          <p className="px-1 text-sm text-gray-400">
            인증번호가 오지 않나요? <span className="underline cursor-pointer hover:text-gray-600">고객센터 문의</span>
          </p>
        </div>

        {/* 하단 확인 버튼 */}
        <div className="mt-10">
          <button 
            onClick={onBack} 
            className="w-full py-4 rounded-xl font-medium transition-all border border-gray-400 text-gray-600 hover:bg-gray-50 md:border-2 dark:border-white dark:text-white dark:hover:bg-white/10"
          >
            확인
          </button>
        </div>
      </div>
    </SubPanel>
  );
}