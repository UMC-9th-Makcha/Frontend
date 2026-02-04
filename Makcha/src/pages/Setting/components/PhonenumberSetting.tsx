import { useState, useEffect, useMemo, useCallback } from "react";
import { X } from "lucide-react";
import axios from "axios";
import SubPanel from "../../../components/common/Panel/SubPanel";
import useToastStore from "../../../store/useToastStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { usePhoneConfirmStore } from "../../../store/usePhoneConfirmStore";
import { authService } from "../../../apis/auth";
import type { ApiError } from "../../../types/api";

interface PhonenumberSettingProps {
  onBack: () => void;
  onComplete?: (data: { phone: string }) => void;
}

export const PhonenumberSetting = ({ onBack, onComplete }: PhonenumberSettingProps) => {
  const { user, updateUserPhone } = useAuthStore();
  const { phone, isSent, timer, setPhone, startTimer, decrementTimer, resetAuth } = usePhoneConfirmStore();
  const { addToast } = useToastStore();
  
  const [authCode, setAuthCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const hasPhone = !!user?.phone;

  // 타이머 카운트다운
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => decrementTimer(), 1000);
    return () => clearInterval(interval);
  }, [timer, decrementTimer]);

  // 언마운트 시 입력 정보 초기화
  useEffect(() => {
    return () => resetAuth();
  }, [resetAuth]);

  // 인증번호 발송 API 연동
  const handleRequestAuth = async () => {
    const rawPhone = phone.replace(/\D/g, "");
    if (rawPhone.length !== 11) {
      addToast("전화번호 11자리를 정확히 입력해주세요.", "error");
      return;
    }

    setIsLoading(true);
    try {
      await authService.sendPhoneCode(phone);
      startTimer();
      addToast("인증번호가 발송되었습니다.", "info");
    } catch (error: unknown) { // any -> unknown으로 변경
      let message = "인증번호 발송에 실패했습니다.";
      
      if (axios.isAxiosError<ApiError>(error)) {
        message = error.response?.data?.message || message;
      }
      
      addToast(message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // 인증번호 검증 API 연동
  const handleSubmit = useCallback(async () => {
    if (authCode.length !== 6 || !isSent) return;

    setIsLoading(true);
    try {
      await authService.verifyPhoneCode(phone, authCode);
      
      updateUserPhone(phone);
      
      addToast(hasPhone ? "연락처가 변경되었습니다." : "연락처가 등록되었습니다.", "success");
      onComplete?.({ phone });
    } catch (error: unknown) { // any -> unknown으로 변경
      let message = "인증번호가 일치하지 않거나 만료되었습니다.";
      
      if (axios.isAxiosError<ApiError>(error)) {
        message = error.response?.data?.message || message;
      }

      addToast(message, "error");
    } finally {
      setIsLoading(false);
    }
  }, [authCode, phone, isSent, hasPhone, updateUserPhone, onComplete, addToast]);

  // 인증번호 6자리 입력 시 자동 제출
  useEffect(() => {
    if (authCode.length === 6) {
      handleSubmit();
    }
  }, [authCode, handleSubmit]);

  const timeString = useMemo(() => {
    const min = Math.floor(timer / 60).toString().padStart(2, "0");
    const sec = (timer % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  }, [timer]);

  return (
    <SubPanel
      isOpen={true}
      onBack={onBack}
      title={hasPhone ? "연락처 변경" : "연락처 등록"}
      rightAction={
        <button type="button" onClick={onBack} className="p-1 text-gray-400 hover:text-makcha-navy-900 dark:hover:text-white transition-colors">
          <X size={24} />
        </button>
      }
      footer={
        <button
          type="button"
          onClick={handleSubmit}
          disabled={authCode.length !== 6 || !isSent || isLoading}
          className="w-full rounded-xl border border-gray-400 py-4 font-bold text-gray-600 transition-all hover:bg-gray-50 disabled:opacity-30 dark:border-white dark:text-white dark:hover:bg-white/10 md:border-2"
        >
          {isLoading ? "처리 중..." : "확인"}
        </button>
      }
    >
      <div className="flex h-full flex-col space-y-8">
        {/* 상단 폰번호 입력 섹션 */}
        <section>
          <label className="mb-3 block text-xs font-bold uppercase text-gray-500 dark:text-makcha-navy-300">
            {hasPhone ? "새로운 전화번호" : "휴대폰 번호"}
          </label>
          <div className="relative flex items-center">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={13}
              placeholder="010-0000-0000"
              className="w-full rounded-xl border border-gray-200 bg-transparent p-4 pr-[110px] text-gray-900 outline-none focus:border-blue-500 dark:border-white/10 dark:text-white"
            />
            <button
              type="button"
              onClick={handleRequestAuth}
              disabled={phone.length < 12 || isLoading}
              className={`absolute right-2 rounded-lg border px-3 py-2 text-[12px] font-bold transition-all
                ${isSent ? "border-blue-500 text-blue-500" : "border-gray-400 text-gray-600 dark:border-white/40 dark:text-white"}
                disabled:opacity-30`}
            >
              {isSent ? "재발송" : "인증 요청"}
            </button>
          </div>
          {hasPhone && (
            <p className="mt-2 px-1 text-xs text-gray-400">현재 번호: {user?.phone}</p>
          )}
        </section>

        {/* 하단 인증번호 입력 섹션 */}
        <section className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              disabled={!isSent}
              placeholder="인증번호 6자리"
              className="w-full rounded-xl bg-gray-100 p-4 text-gray-900 outline-none ring-blue-500/50 focus:ring-1 dark:bg-makcha-navy-800 dark:text-white"
            />
            {isSent && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono font-bold text-blue-500">
                {timeString}
              </span>
            )}
          </div>
        </section>
      </div>
    </SubPanel>
  );
};