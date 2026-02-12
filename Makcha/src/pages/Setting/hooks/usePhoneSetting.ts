import { useState, useEffect, useCallback, useMemo } from 'react';

export const usePhoneSetting = () => {
  const [phone, setPhoneState] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [timer, setTimer] = useState(0);

  // 휴대폰 번호 포맷팅
  const setPhone = useCallback((val: string) => {
    const nums = val.replace(/\D/g, "").slice(0, 11);
    let formatted = "";
    if (nums.length <= 3) formatted = nums;
    else if (nums.length <= 7) formatted = `${nums.slice(0, 3)}-${nums.slice(3)}`;
    else formatted = `${nums.slice(0, 3)}-${nums.slice(3, 7)}-${nums.slice(7)}`;
    setPhoneState(formatted);
  }, []);

  const isActive = isSent && timer > 0;

  // 상태 제어
  useEffect(() => {
    if (!isActive) return;

    const intervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setIsSent(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive]);

  const startTimer = useCallback(() => {
    setIsSent(true);
    setTimer(180);
  }, []);

  const resetAuth = useCallback(() => {
    setIsSent(false);
    setTimer(0);
    setPhoneState("");
  }, []);

  const formatTime = useMemo(() => {
    const mins = Math.floor(timer / 60);
    const secs = timer % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, [timer]);

  return useMemo(() => ({ 
    phone, 
    isSent, 
    timer, 
    formatTime, 
    setPhone, 
    startTimer, 
    resetAuth 
  }), [phone, isSent, timer, formatTime, setPhone, startTimer, resetAuth]);
};