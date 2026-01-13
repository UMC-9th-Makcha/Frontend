import type { ReactNode } from "react";
import type { ViewType } from "../constants";

interface SettingBgProps {
  view: ViewType;
  children: ReactNode;
}

export function SettingBg({ view, children }: SettingBgProps) {
  if (view === 'MAIN') {
    return <section className="hidden flex-1 bg-gray-50 dark:bg-makcha-navy-950 md:flex" />;
  }

  return (
    <section className="flex flex-1 items-start justify-start overflow-y-auto bg-gray-50 p-0 dark:bg-makcha-navy-950 md:p-6 md:pl-4">
      {children}
    </section>
  );
}