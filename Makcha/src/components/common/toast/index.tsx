import { memo } from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import useToastStore, { type ToastType } from "../../../store/useToastStore";

const TOAST_ICONS = {
  success: { Icon: CheckCircle2, color: "text-green-500" },
  error: { Icon: AlertCircle, color: "text-red-500" },
  info: { Icon: Info, color: "text-blue-500" },
  warning: { Icon: AlertTriangle, color: "text-yellow-500" },
};

const ToastItem = memo(({ id, type, message, onRemove }: { 
  id: number;
  type: ToastType; 
  message: string; 
  onRemove: (id: number) => void;
}) => {
  const { Icon, color } = TOAST_ICONS[type];

  return (
    <div className="group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-gray-100 bg-white/90 p-4 shadow-xl backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-5 dark:border-white/10 dark:bg-makcha-navy-900/90">
      <div className="shrink-0">
        <Icon className={`h-5 w-5 ${color}`} />
      </div>

      <div className="flex-1 text-base font-semibold text-gray-900 dark:text-gray-100">
        {message}
      </div>

      <button
        onClick={() => onRemove(id)}
        className="ml-1 rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-white/10"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
});

ToastItem.displayName = "ToastItem";

const Toast = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-8 left-1/2 z-50 flex w-full -translate-x-1/2 flex-col gap-2 px-4 md:max-w-sm md:px-0">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          onRemove={removeToast}
        />
      ))}
    </div>
  );
};

export default Toast;