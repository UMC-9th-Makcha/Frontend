import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { PhonenumberSettingProps } from "../../types/setting";

export default function PhonenumberSetting({ onBack }: PhonenumberSettingProps) {
  const [phone, setPhone] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [timer, setTimer] = useState(0);

  // 휴대폰 번호 하이픈 자동 삽입
  const handlePhoneChange = (val: string) => {
    const nums = val.replace(/\D/g, "");
    let formatted = "";
    if (nums.length <= 3) formatted = nums;
    else if (nums.length <= 7) formatted = `${nums.slice(0, 3)}-${nums.slice(3)}`;
    else formatted = `${nums.slice(0, 3)}-${nums.slice(3, 7)}-${nums.slice(7, 11)}`;
    setPhone(formatted);
  };

  // 타이머 로직 (인증번호를 받았을 때만 작동)
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
    <div className="flex flex-col bg-white dark:bg-makcha-navy-900 w-full h-full md:h-auto md:max-h-[820px] md:max-w-[440px] md:rounded-[40px] md:shadow-2xl overflow-hidden transition-all duration-300">
      <header className="flex items-center justify-between px-6 py-4 md:py-6 border-b border-gray-50 dark:border-makcha-navy-800 shrink-0">
        <div className="w-8" />
        <h2 className="text-[18px] md:text-[20px] font-bold dark:text-white">연락처 변경</h2>
        <button onClick={onBack} className="p-1 text-gray-400"><X size={24} /></button>
      </header>
      
      <main className="flex-1 p-6 md:p-8 flex flex-col overflow-y-auto no-scrollbar bg-white dark:bg-makcha-navy-900">
        <div className="space-y-6 flex-1">
          <div>
            <label className="text-[16px] font-medium block mb-3 dark:text-white">새로운 전화번호</label>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              maxLength={13}
              placeholder="010-0000-0000" 
              className="w-full p-4 border border-gray-100 rounded-xl outline-none dark:border-makcha-navy-800 dark:bg-transparent dark:text-white focus:border-blue-500 transition-colors" 
            />
          </div>
          <button 
            onClick={requestAuthCode}
            className={`w-full py-4 border border-gray-900 rounded-xl font-bold dark:border-white dark:text-white active:bg-gray-100 dark:active:bg-makcha-navy-800 transition-all ${isSent ? 'opacity-50' : ''}`}
          >
            {isSent ? "인증번호 재발송" : "인증번호 받기"}
          </button>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="인증번호 6자리 입력" 
              className="w-full p-4 bg-gray-50 rounded-xl outline-none dark:bg-makcha-navy-800 dark:text-white focus:ring-1 ring-blue-500/50" 
            />
            {isSent && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 font-mono font-medium">
                {formatTime(timer)}
              </span>
            )}
          </div>
          <p className="text-right text-sm font-medium text-gray-500 underline cursor-pointer">재발송</p>
        </div>
        <div className="mt-10 pb-10 md:pb-0">
          <button onClick={onBack} className="w-full py-5 bg-blue-600 text-white rounded-3xl font-bold shadow-xl active:scale-[0.98] transition-all">확인</button>
        </div>
      </main>
    </div>
  );
}