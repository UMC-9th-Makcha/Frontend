import type { ReactNode } from "react";

export interface SearchResult {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  }
  
export interface AddressSearchProps {
    onSelect: (result: SearchResult) => void;
    placeholder?: string;
    initialContent?: ReactNode;
  }
  
export interface KakaoAddressResult {
    id: string;
    place_name: string;
    road_address_name: string;
    address_name: string;
    x: string;
    y: string;
  }

export interface KakaoServices {
    Places: new () => {
      keywordSearch: (
        keyword: string,
        callback: (data: KakaoAddressResult[], status: string, pagination: object) => void
      ) => void;
    };
    Status: {
      OK: string;
      ZERO_RESULT: string;
      ERROR: string;
    };
  }
  
declare global {
    interface Window {
      kakao: {
        maps: {
          services: KakaoServices;
        };
      };
    }
  }