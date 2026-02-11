import { memo } from "react";
import type { SettingBgProps } from "../types/setting";

export const SettingBg = memo(({ view, children }: SettingBgProps) => {

  if (view === 'MAIN') {
    return <section className="hidden flex-1 md:flex" />;
  }

  return (
    <section 
      className="flex flex-1 items-start justify-start overflow-y-auto p-0 md:p-6 md:pl-4 min-h-0"
      aria-label="Setting Detail Content"
    >
      <div className="w-full h-full">
        {children}
      </div>
    </section>
  );
});

SettingBg.displayName = 'SettingBg';