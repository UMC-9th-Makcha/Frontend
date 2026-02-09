import { useState, useCallback } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query"; 
import SubPanel from "../../../components/common/Panel/SubPanel";
import useToastStore from "../../../store/useToastStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { authService } from "../../../apis/auth";
import type { ApiError } from "../../../types/api";
import { usePhoneSetting } from "../hooks/usePhoneSetting";
import type { PhonenumberSettingProps } from "../types/setting";

export const PhonenumberSetting = ({ onBack, onComplete }: PhonenumberSettingProps) => {
  const { user, updateUserPhone } = useAuthStore();
  const { addToast } = useToastStore();
  const { phone, isSent, timer, setPhone, startTimer } = usePhoneSetting();

  const queryClient = useQueryClient(); 
  
  const [authCode, setAuthCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const hasPhone = !!user?.phone;

  const min = Math.floor(timer / 60).toString().padStart(2, "0");
  const sec = (timer % 60).toString().padStart(2, "0");
  const timeString = `${min}:${sec}`;

  const handleRequestAuth = async () => {
    const rawPhone = phone.replace(/\D/g, "");
    if (rawPhone.length !== 11) {
      addToast("전화번호 11자리를 입력해주세요.", "error");
      return;
    }
    setIsLoading(true);
    try {
      await authService.sendPhoneCode(phone);
      startTimer();
      addToast("인증번호가 발송되었습니다.", "info");
    } catch (error: unknown) {
      let message = "인증번호 발송에 실패했습니다.";
      if (axios.isAxiosError<ApiError>(error)) {
        message = error.response?.data?.message || message;
      }
      addToast(message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = useCallback(async () => {
    if (authCode.length !== 6 || !isSent) return;

    setIsLoading(true);
    try {
      await authService.verifyPhoneCode(phone, authCode);
      
      updateUserPhone(phone); 
      await queryClient.invalidateQueries({ queryKey: ['me'] }); 
      
      addToast(hasPhone ? "연락처가 변경되었습니다." : "연락처가 등록되었습니다.", "success");
      onComplete?.({ phone });
    } catch (error: unknown) {
      let message = "인증번호가 일치하지 않거나 만료되었습니다.";
      if (axios.isAxiosError<ApiError>(error)) {
        message = error.response?.data?.message || message;
      }
      addToast(message, "error");
    } finally {
      setIsLoading(false);
    }
  }, [authCode, phone, isSent, hasPhone, updateUserPhone, onComplete, addToast, queryClient]);

  return (
    <SubPanel
      isOpen={true}
      onBack={onBack}
      title={hasPhone ? "연락처 변경" : "연락처 등록"}
      rightAction={
        <button 
          type="button" 
          onClick={onBack} 
          className="p-1 -mr-2 text-gray-900 dark:text-gray-50 hover:opacity-70 transition-opacity"
        >
          <X size={24} />
        </button>
      }
      footer={
        <button
          type="button"
          onClick={handleSubmit}
          disabled={authCode.length !== 6 || !isSent || isLoading}
          className={`
            w-full h-14 rounded-xl font-bold text-base transition-all
            ${authCode.length === 6 && isSent && !isLoading
              ? "bg-makcha-navy-900 text-white dark:bg-white dark:text-makcha-navy-900 hover:opacity-90 shadow-md"
              : "bg-gray-100 text-gray-400 dark:bg-makcha-navy-800 dark:text-white/30 cursor-not-allowed"
            }
          `}
        >
          {isLoading ? "처리 중..." : "확인"}
        </button>
      }
    >
      <div className="flex h-full flex-col space-y-6 px-1">
        
        {/* 전화번호 입력 */}
        <section>
          <label className="mb-2 block text-sm font-bold text-gray-900 dark:text-gray-50">
            {hasPhone ? "새로운 전화번호" : "휴대폰 번호"}
          </label>
          
          <div className="relative flex items-center">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={13}
              placeholder="010-0000-0000"
              className="w-full h-14 rounded-xl border border-gray-200 bg-gray-50 px-4 pr-24 text-base text-gray-900 outline-none focus:border-blue-500 focus:bg-white dark:border-makcha-navy-700 dark:bg-makcha-navy-800 dark:text-white dark:focus:border-blue-400 transition-colors"
            />
            
            <button
              type="button"
              onClick={handleRequestAuth}
              disabled={phone.length < 12 || isLoading}
              /* [수정] absolute 위치 및 크기 표준화 */
              className={`
                absolute right-3 top-1/2 -translate-y-1/2 
                px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                ${isSent 
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400" 
                  : "bg-gray-200 text-gray-500 dark:bg-white/10 dark:text-white/50"
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {isSent ? "재발송" : "인증 요청"}
            </button>
          </div>
          
          {hasPhone && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              현재 번호: <span className="font-medium text-gray-700 dark:text-gray-300">{user?.phone}</span>
            </p>
          )}
        </section>

        {/* 인증번호 입력 */}
        <section className={`transition-opacity duration-300 ${isSent ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
           <label className="mb-2 block text-sm font-bold text-gray-900 dark:text-gray-50">
            인증번호
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              disabled={!isSent}
              placeholder="인증번호 6자리"
              className="w-full h-14 rounded-xl border border-gray-200 bg-gray-50 px-4 text-base tracking-widest text-gray-900 outline-none focus:border-blue-500 focus:bg-white dark:border-makcha-navy-700 dark:bg-makcha-navy-800 dark:text-white dark:focus:border-blue-400 transition-colors disabled:bg-gray-100 dark:disabled:bg-makcha-navy-900/50"
            />
            
            {isSent && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-sm font-medium text-red-500 dark:text-red-400">
                {timeString}
              </span>
            )}
          </div>
          {isSent && (
             <p className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                * 문자가 오지 않으면 스팸함을 확인해주세요.
             </p>
          )}
        </section>
      </div>
    </SubPanel>
  );
};