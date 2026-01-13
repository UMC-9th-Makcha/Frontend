import { useState, useEffect, useCallback, useMemo } from "react";
import { X } from "lucide-react";
import SubPanel from "../../../components/common/Panel/SubPanel";
import type { PhonenumberSettingProps } from "../../../types/setting";

export const PhonenumberSetting = ({ onBack }: PhonenumberSettingProps) => {
  // State
  const [phone, setPhone] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [timer, setTimer] = useState(0);

  // Handlers
  const handlePhoneChange = useCallback((val: string) => {
    const nums = val.replace(/\D/g, "");
    let formatted = "";
    if (nums.length <= 3) formatted = nums;
    else if (nums.length <= 7) formatted = `${nums.slice(0, 3)}-${nums.slice(3)}`;
    else formatted = `${nums.slice(0, 3)}-${nums.slice(3, 7)}-${nums.slice(7, 11)}`;
    setPhone(formatted);
  }, []);

  const requestAuthCode = useCallback(() => {
    // API 연동 지점
    setIsSent(true);
    setTimer(180);
  }, []);

  const handleSubmit = useCallback(() => {
    // 최종 확인 로직
    console.log("인증번호 확인:", authCode);
    onBack();
  }, [authCode, onBack]);

  // Timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // 연산 결과물
  const timeString = useMemo(() => {
    const min = Math.floor(timer / 60).toString().padStart(2, '0');
    const sec = (timer % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  }, [timer]);

  const canRequest = phone.length >= 12 && !isSent;
  const canSubmit = authCode.length === 6 && isSent;

  return (
    <SubPanel
      isOpen={true}
      onBack={onBack}
      title="연락처 변경"
      rightAction={
        <button onClick={onBack} className="p-1 text-gray-400 hover:text-makcha-navy-900 dark:hover:text-white transition-colors">
          <X size={24} />
        </button>
      }
      footer={
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="w-full rounded-xl border border-gray-400 py-4 font-bold text-gray-600 transition-all hover:bg-gray-50 disabled:opacity-30 dark:border-white dark:text-white dark:hover:bg-white/10 md:border-2"
      >
        확인
      </button>}
    >
      <div className="flex h-full flex-col">
        <div className="flex-1 space-y-8">
          {/* 전화번호 입력 섹션 */}
          <section>
            <label className="mb-3 block text-xs font-bold uppercase text-gray-500 dark:text-makcha-navy-300">
              새로운 전화번호
            </label>
            <div className="relative flex items-center">
              <input
                type="tel"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                maxLength={13}
                placeholder="010-0000-0000"
                className="w-full rounded-xl border border-gray-200 bg-transparent p-4 pr-[110px] text-gray-900 outline-none transition-colors focus:border-blue-500 dark:border-white/10 dark:text-white"
              />
              <button
                type="button"
                onClick={requestAuthCode}
                disabled={!canRequest && !isSent}
                className={`absolute right-2 rounded-lg border px-3 py-2 text-[12px] font-bold transition-all
                  ${isSent 
                    ? 'border-blue-500 text-blue-500' 
                    : 'border-gray-400 text-gray-600 dark:border-white/40 dark:text-white'}
                  disabled:opacity-30 disabled:cursor-not-allowed`}
              >
                {isSent ? "재발송" : "인증 요청"}
              </button>
            </div>
          </section>

          {/* 인증번호 입력 섹션 */}
          <section className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value.replace(/\D/g, ""))}
                maxLength={6}
                placeholder="인증번호 6자리 입력"
                className="w-full rounded-xl bg-gray-100 p-4 text-gray-900 outline-none ring-blue-500/50 focus:ring-1 dark:bg-makcha-navy-800 dark:text-white dark:placeholder:text-makcha-navy-500"
              />
              {isSent && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono font-bold text-blue-500">
                  {timeString}
                </span>
              )}
            </div>
            <p className="px-1 text-sm text-gray-400">
              인증번호가 오지 않나요? <span className="cursor-pointer underline hover:text-gray-600 dark:hover:text-white">고객센터 문의</span>
            </p>
          </section>
        </div>
      </div>
    </SubPanel>
  );
};