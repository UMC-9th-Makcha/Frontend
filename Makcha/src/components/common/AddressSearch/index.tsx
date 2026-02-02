import { useState, useEffect, useCallback } from "react";
import type { ChangeEvent } from "react";
import { Search, X } from "lucide-react";
import type { AddressSearchProps, KakaoAddressResult } from "./types/addressSearch";

export default function AddressSearch({ 
  onSelect, 
  placeholder = "장소, 주소 검색",
  initialContent 
}: AddressSearchProps) {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<KakaoAddressResult[]>([]);
  const [status, setStatus] = useState<"INIT" | "ING" | "OK" | "ZERO">("INIT");

  const searchPlaces = useCallback((query: string) => {
    if (!window.kakao?.maps?.services) return;

    const ps = new window.kakao.maps.services.Places();
    setStatus("ING");

    ps.keywordSearch(query, (data: KakaoAddressResult[], kakaoStatus: string) => {
      if (kakaoStatus === window.kakao.maps.services.Status.OK) {
        setResults(data);
        setStatus("OK");
      } else {
        setResults([]);
        setStatus("ZERO");
      }
    });
  }, []);

  // 입력 핸들러
  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setKeyword(val);

    if (!val.trim()) {
      setResults([]);
      setStatus("INIT");
    }
  };

  const handleClear = () => {
    setKeyword("");
    setResults([]);
    setStatus("INIT");
  };

  // 디바운스
  useEffect(() => {
    const trimmed = keyword.trim();
    if (!trimmed) return;

    const timer = setTimeout(() => searchPlaces(trimmed), 300);
    return () => clearTimeout(timer);
  }, [keyword, searchPlaces]);

  return (
    <div className="flex h-full flex-col bg-white dark:bg-makcha-navy-900">
      {/* 검색 바 */}
      <div className="px-4 py-3 pb-4">
        <div className="flex items-center rounded-2xl bg-gray-100 px-4 py-3 dark:bg-makcha-navy-800 transition-colors">
          <Search size={20} className="text-gray-400 shrink-0" />
          <input
            value={keyword}
            onChange={handleKeywordChange}
            placeholder={placeholder}
            className="ml-3 flex-1 bg-transparent text-base font-medium outline-none dark:text-white placeholder:text-gray-400"
            autoFocus
          />
          {keyword && (
            <button onClick={handleClear} className="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors">
              <X size={16} className="text-gray-400" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 scrollbar-hide">
        {keyword ? (
          results.length > 0 ? (
            <ul className="space-y-1">
              {results.map((item) => (
                <li
                  key={item.id}
                  onClick={() =>
                    onSelect({
                      id: item.id,
                      name: item.place_name,
                      address: item.road_address_name || item.address_name,
                      latitude: parseFloat(item.y),
                      longitude: parseFloat(item.x),
                    })
                  }
                  className="flex cursor-pointer flex-col gap-0.5 rounded-xl px-3 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="text-base font-bold text-gray-900 dark:text-white">
                    {item.place_name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {item.road_address_name || item.address_name}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-20 text-center text-gray-400 text-sm">
              {status === "ING" ? <p>검색중...</p> : <p>검색 결과가 없습니다.</p>}
            </div>
          )
        ) : (
          /* 초기 화면 */
          initialContent ? (
            <div className="h-full">{initialContent}</div>
          ) : (
            <div className="mt-20 flex flex-col items-center justify-center text-gray-400 opacity-60">
               <Search size={40} className="mb-4" />
               <p className="text-sm">도로명, 건물명, 지번으로</p>
               <p className="text-sm">장소를 검색해보세요.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}