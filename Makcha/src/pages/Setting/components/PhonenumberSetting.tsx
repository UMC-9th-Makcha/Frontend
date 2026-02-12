import { useState, useCallback, memo, useMemo } from "react";
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

export const PhonenumberSetting = memo(({ onBack, onComplete }: PhonenumberSettingProps) => {
  const { user, updateUserPhone } = useAuthStore();
  const addToast = useToastStore((state) => state.addToast);
  const { phone, isSent, formatTime, setPhone, startTimer } = usePhoneSetting();
  const queryClient = useQueryClient(); 
  
  const [authCode, setAuthCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const hasPhone = !!user?.phone;

  const formattedCurrentPhone = useMemo(() => {
    if (!user?.phone) return "";
    const cleaned = user.phone.replace(/\D/g, "");
    return cleaned.replace(/^(\d{3})(\d{3,4})(\d{4})$/, "$1-$2-$3");
  }, [user?.phone]);

  const handleRequestAuth = useCallback(async () => {
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
  }, [phone, startTimer, addToast]);

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

  const isSubmitDisabled = authCode.length !== 6 || !isSent || isLoading;

  return (
    <SubPanel
      isOpen={true}
      onBack={onBack}
      title={hasPhone ? "연락처 변경" : "연락처 등록"}
      rightAction={
        <button type="button" onClick={onBack} className="p-1 -mr-2 text-gray-900 dark:text-gray-50 hover:opacity-70">
          <X size={24} />
        </button>
      }
      footer={
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className={`w-full h-14 rounded-xl font-bold text-body transition-all
            ${!isSubmitDisabled
              ? "bg-makcha-navy-900 text-white dark:bg-white dark:text-makcha-navy-900 active:scale-[0.98]"
              : "bg-gray-100 text-gray-400 dark:bg-makcha-navy-800 dark:text-white/30 cursor-not-allowed"
            }
          `}
        >
          {isLoading ? "처리 중..." : "확인"}
        </button>
      }
    >
      <div className="flex h-full flex-col space-y-8 px-1 py-2">
        
        {/* 전화번호 입력 */}
        <section>
          <label className="mb-3 block text-caption font-bold uppercase text-gray-500 dark:text-makcha-navy-300">
            {hasPhone ? "새로운 전화번호" : "휴대폰 번호"}
          </label>
          <div className="relative flex items-center">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={13}
              placeholder="010-0000-0000"
              className="w-full h-14 rounded-xl border border-gray-100 bg-gray-50 px-4 pr-28 text-body text-gray-900 outline-none focus:border-makcha-navy-800 dark:border-makcha-navy-700 dark:bg-makcha-navy-800 dark:text-white transition-all"
            />
            <button
              type="button"
              onClick={handleRequestAuth}
              disabled={phone.length < 12 || isLoading}
              className={`absolute right-3 px-3 py-2 rounded-lg text-caption font-bold transition-all
                ${isSent 
                  ? "bg-makcha-navy-100 text-makcha-navy-900 dark:bg-white/10 dark:text-white" 
                  : "bg-gray-200 text-gray-600 dark:bg-white/5 dark:text-white/30"
                }
              `}
            >
              {isSent ? "재발송" : "인증 요청"}
            </button>
          </div>

          {hasPhone && (
            <div className="mt-3 flex items-center justify-between px-1">
              <span className="text-caption text-gray-500 dark:text-gray-400">현재 등록된 번호</span>
              <span className="text-body text-gray-700 dark:text-gray-300">{formattedCurrentPhone}</span>
            </div>
          )}
        </section>

        {/* 인증번호 입력 */}
        <section className={`transition-all duration-200 ${isSent ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
          <label className="mb-3 block text-caption font-bold uppercase text-gray-500 dark:text-makcha-navy-300">
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
              placeholder="6자리 숫자 입력"
              className="w-full h-14 rounded-xl border border-gray-100 bg-gray-50 px-4 text-body tracking-[0.2em] font-bold text-gray-900 outline-none focus:border-makcha-navy-800 dark:border-makcha-navy-700 dark:bg-makcha-navy-800 dark:text-white transition-all"
            />
            {isSent && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-body font-bold text-red-500">
                {formatTime}
              </span>
            )}
          </div>
        </section>
      </div>
    </SubPanel>
  );
});

PhonenumberSetting.displayName = 'PhonenumberSetting';