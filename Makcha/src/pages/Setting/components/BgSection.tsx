import type { ReactNode } from "react";
import type { ViewType } from "../constants";

interface SettingBgProps {
  view: ViewType;
  children: ReactNode;
}

export function SettingBg({ view, children }: SettingBgProps) {
  if (view === 'MAIN') {
    return <section className="hidden flex-1 md:flex" />;
  }

  return (
    <section className="flex flex-1 items-start justify-start overflow-y-auto p-0 md:p-6 md:pl-4">
      {children}
    </section>
  );
}