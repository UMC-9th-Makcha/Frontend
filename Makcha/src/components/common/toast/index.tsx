import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import useToastStore, { type ToastType } from "../../../store/useToastStore";

const iconMap: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
};

const Toast = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-5 right-5 z-100 flex flex-col gap-3 w-full max-w-[350px]">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-gray-100 bg-white/80 p-4 shadow-lg backdrop-blur-md transition-all animate-in fade-in slide-in-from-right-5 dark:border-white/10 dark:bg-makcha-navy-900/90"
        >
          {/* 왼쪽 아이콘 */}
          <div className="shrink-0">{iconMap[toast.type]}</div>

          {/* 메시지 */}
          <div className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-100">
            {toast.message}
          </div>

          {/* 닫기 버튼 */}
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;