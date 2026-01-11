import { POLICIES } from "./constant";

export default function PolicyLinks() {
    return (
      <div className="mt-6 flex flex-wrap justify-center items-center gap-x-2 gap-y-1 text-[10px] text-slate-400 dark:text-slate-500 opacity-70">
        {POLICIES.map((policy, index) => (
          <div key={policy.label} className="flex items-center gap-x-2">
            <a
              href={policy.href}
              target="_blank"
              rel="noreferrer"
              className="hover:underline hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              {policy.label}
            </a>
            {index < POLICIES.length - 1 && <span className="cursor-default">|</span>}
          </div>
        ))}
      </div>
    );
  }