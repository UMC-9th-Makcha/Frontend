import { POLICIES } from "./constant";

export default function PolicyLinks() {
  return (
    <div 
      className={`
        flex flex-wrap justify-center items-center 
        gap-x-2 gap-y-2 py-2 w-full
        text-caption text-gray-500 dark:text-gray-500
        transition-all duration-200 ease-in-out
      `}
    >
      {POLICIES.map((policy, index) => (
        <div key={policy.label} className="flex items-center">
          <a
            href={policy.href}
            target="_blank"
            rel="noreferrer"
            className={`
              hover:underline hover:text-gray-700 dark:hover:text-gray-200 
              transition-all duration-200 ease-in-out
            `}
          >
            {policy.label}
          </a>

          {index < POLICIES.length - 1 && (
            <span className="mx-2 cursor-default font-light text-[8px] transition-all duration-200 ease-in-out">
              |
            </span>
          )}
        </div>
      ))}
    </div>
  );
}