import { POLICIES } from "./constant";

export default function PolicyLinks() {
  return (
    <div 
      className={`
        flex flex-wrap justify-center items-center 
        gap-x-2 gap-y-2 
        text-[11px] text-slate-400 dark:text-slate-500 
        opacity-70 py-2 w-full
      `}
    >
      {POLICIES.map((policy, index) => (
        <div key={policy.label} className="flex items-center">
          <a
            href={policy.href}
            target="_blank"
            rel="noreferrer"
            className="hover:underline hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            {policy.label}
          </a>

          {index < POLICIES.length - 1 && (
            <span className="mx-2 cursor-default text-slate-200 dark:text-slate-800 font-light text-[9px]">
              |
            </span>
          )}
        </div>
      ))}
    </div>
  );
}