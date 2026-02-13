import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastState {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: number) => void;
  clearAll: () => void;
}

const MAX_TOAST_LIMIT = 5; 

const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  addToast: (message, type = 'success', duration = 3000) => {
    const id = Date.now();

    set((state) => {
      const nextToasts = [...state.toasts, { id, message, type }];
      if (nextToasts.length > MAX_TOAST_LIMIT) {
        nextToasts.shift();
      }
      return { toasts: nextToasts };
    });

    if (duration !== Infinity) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, duration);
    }
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  clearAll: () => set({ toasts: [] }),
}));

export default useToastStore;