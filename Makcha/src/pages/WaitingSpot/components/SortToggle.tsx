import { useState } from "react";
import type { SortToggleProps } from "../types/waitingspot";
import { toggleLabel } from "../common/constants";

export const SortToggle = ({ value, onChange }: SortToggleProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block py-2 px-2">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 text-gray-900"
        aria-expanded={open}
        aria-haspopup="menu">
        {toggleLabel[value]}
        <span className="text-sm">▼</span>
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-36 rounded-lg border bg-white shadow-md z-10">
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={() => {
              onChange("distance");
              setOpen(false);
            }}>
            가까운순
          </button>
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={() => {
              onChange("24hour");
              setOpen(false);
            }}>
            24시간 우선
          </button>
        </div>
      )}
    </div>
  );
};
