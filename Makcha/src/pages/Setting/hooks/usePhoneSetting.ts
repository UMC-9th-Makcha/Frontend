import { useState, useEffect, useCallback } from 'react';

export const usePhoneSetting = () => {
  const [phone, setPhoneState] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [timer, setTimer] = useState(0);

  // 휴대폰 번호 포맷팅
  const setPhone = useCallback((val: string) => {
    const nums = val.replace(/\D/g, "");
    let formatted = "";
    if (nums.length <= 3) formatted = nums;
    else if (nums.length <= 7) formatted = `${nums.slice(0, 3)}-${nums.slice(3)}`;
    else formatted = `${nums.slice(0, 3)}-${nums.slice(3, 7)}-${nums.slice(7, 11)}`;
    
    setPhoneState(formatted);
  }, []);

  // 타이머 시작
  const startTimer = useCallback(() => {
    setIsSent(true);
    setTimer(180);
  }, []);

  // 타이머 감소
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      // 타이머 종료 시 로직
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSent, timer]);

  // 초기화
  const resetAuth = useCallback(() => {
    setIsSent(false);
    setTimer(0);
    setPhoneState("");
  }, []);

  return { 
    phone, 
    isSent, 
    timer, 
    setPhone, 
    startTimer, 
    resetAuth 
  };
};