import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import type { OverlayPortalProps } from "../../../types/portal";

export function OverlayPortal({ open, onClose, children, closeOnBackdrop = true, }: OverlayPortalProps) {
  const portalElement = useMemo(() => {
    if (typeof document === "undefined") return null;
    return document.getElementById("portal-root");
  }, []);

  //ESC로 닫기
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  //body 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || !portalElement) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      {closeOnBackdrop && (
        <button
          className="absolute inset-0 bg-black/40"
          aria-label="닫기"
          onClick={onClose}
        />
      )}

      {/* content */}
      <div
        className="relative z-10 h-dvh w-screen bg-white dark:bg-makcha-navy-900"
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>,
    portalElement
  );
}
