import { create } from 'zustand';

interface AuthPhoneState {
  phone: string;
  isSent: boolean;
  timer: number;
  setPhone: (val: string) => void;
  startTimer: () => void;
  decrementTimer: () => void;
  resetAuth: () => void;
}

export const usePhoneConfirmStore = create<AuthPhoneState>((set) => ({
  phone: "",
  isSent: false,
  timer: 0,

  setPhone: (val) => {
    const nums = val.replace(/\D/g, "");
    let formatted = "";
    if (nums.length <= 3) formatted = nums;
    else if (nums.length <= 7) formatted = `${nums.slice(0, 3)}-${nums.slice(3)}`;
    else formatted = `${nums.slice(0, 3)}-${nums.slice(3, 7)}-${nums.slice(7, 11)}`;
    set({ phone: formatted });
  },
  startTimer: () => set({ isSent: true, timer: 180 }),
  decrementTimer: () => set((state) => ({ timer: state.timer > 0 ? state.timer - 1 : 0 })),
  resetAuth: () => set({ isSent: false, timer: 0, phone: "" }),
}));