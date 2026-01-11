import { useEffect, useState } from "react";

export function useIsMobile(md = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < md : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${md - 1}px)`);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, [md]);

  return isMobile;
}
