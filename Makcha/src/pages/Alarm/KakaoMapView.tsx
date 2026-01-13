import { Map, useKakaoLoader } from "react-kakao-maps-sdk";

export default function KakaoMapView() {
    const [loading, error] = useKakaoLoader({
        appkey: import.meta.env.VITE_KAKAO_JS_KEY,
    });

    if (loading) return <div className="h-full w-full" />;
    if (error) return <div className="h-full w-full">지도 로드 실패</div>;

    return (
        <Map
            center={{ lat: 37.5665, lng: 126.9780 }}
            level={4}
            style={{ width: "100%", height: "100%" }}
        />
    );
}
