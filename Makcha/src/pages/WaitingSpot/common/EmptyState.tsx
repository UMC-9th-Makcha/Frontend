import { RotateCcw } from "lucide-react";
import owl from "../../../assets/owl.png"

type EmptyStateProps = {
  message: string;
  actionLabel?: string;
  onRetry?: () => void;
  className?: string;
};

export const EmptyState = ({ message, actionLabel, onRetry, className = "" }: EmptyStateProps) => {
  const showAction = !!actionLabel && !!onRetry;

  return (
    <div className={`flex h-full flex-col items-center justify-center gap-4 mt-8 ${className}`}>
      <img className="w-30 h-30 object-contain" src={owl} alt="" />
      <p className="text-sm text-gray-600">{message}</p>

      {showAction && (
        <button
          type="button"
          onClick={onRetry}
          className="flex items-center gap-2 mt-3 text-gray-500 pointer-events-auto"
        >
          <RotateCcw className="w-5 h-5" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};
