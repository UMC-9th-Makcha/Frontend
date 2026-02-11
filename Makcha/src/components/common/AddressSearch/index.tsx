import { useState, useEffect, useCallback, useRef } from "react";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const psRef = useRef<any>(null);

  // 검색
  const searchPlaces = useCallback((query: string) => {
    if (!window.kakao?.maps?.services) return;
    if (!psRef.current) psRef.current = new window.kakao.maps.services.Places();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    psRef.current.keywordSearch(query, (data: any[], kakaoStatus: string) => {
      if (kakaoStatus === window.kakao.maps.services.Status.OK) {
        setResults(data as KakaoAddressResult[]);
      } else {
        setResults([]);
      }
    });
  }, []);

  // 디바운스
  useEffect(() => {
    const trimmed = keyword.trim();
    if (!trimmed) return;
    const timer = setTimeout(() => searchPlaces(trimmed), 250);
    return () => clearTimeout(timer);
  }, [keyword, searchPlaces]);

  // 핸들러
  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    if (!e.target.value.trim()) setResults([]);
  };

  const handleClear = () => {
    setKeyword("");
    setResults([]);
  };

  return (
    <div className="flex h-full flex-col bg-white dark:bg-makcha-navy-900">
      {/* 검색 바 */}
      <div className="px-4 py-3 shrink-0">
        <div className="flex items-center h-12 rounded-2xl bg-gray-50 dark:bg-makcha-navy-800 border border-gray-100 dark:border-makcha-navy-700">
          <Search size={20} className="ml-4 text-gray-400 shrink-0" />
          <input
            value={keyword}
            onChange={handleKeywordChange}
            placeholder={placeholder}
            className="ml-3 flex-1 bg-transparent font-medium outline-none placeholder:text-gray-400"
            autoFocus
          />
          {keyword && (
            <button 
              onClick={handleClear} 
              className="mr-2 p-1.5 text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-white/10"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* 결과 리스트 */}
      <div className="flex-1 overflow-y-auto px-2">
        {keyword ? (
          results.length > 0 ? (
            <ul className="py-2 space-y-1">
              {results.map((item) => (
                <li
                  key={item.id}
                  onClick={() => onSelect({
                    id: item.id,
                    name: item.place_name,
                    address: item.road_address_name || item.address_name,
                    latitude: parseFloat(item.y),
                    longitude: parseFloat(item.x),
                  })}
                  className="flex cursor-pointer flex-col justify-center rounded-xl px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-makcha-navy-800"
                >
                  <div className="font-bold truncate">
                    {item.place_name}
                  </div>
                  <div className="mt-0.5 text-gray-500 truncate">
                    {item.road_address_name || item.address_name}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex h-60 items-center justify-center text-gray-400">
              <p>검색 결과가 없습니다.</p>
            </div>
          )
        ) : (
          initialContent ? (
            <div className="h-full">{initialContent}</div>
          ) : (
            <div className="flex h-60 flex-col items-center justify-center text-gray-400 opacity-60">
               <Search size={40} className="mb-4" />
               <p>장소를 검색해보세요.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}