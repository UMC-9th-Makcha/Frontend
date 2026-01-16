import { Map, useKakaoLoader } from "react-kakao-maps-sdk";

export const DirectionMap = () => {
  const MAP_KEY = import.meta.env.VITE_KAKAO_JS_KEY as string;

  const [loading, error] = useKakaoLoader({
    appkey: MAP_KEY,
  });

  if (loading) return <div className="h-full w-full" />;
  if (error) return <div className="h-full w-full">지도 로드 실패</div>;

  return (
    <Map
      id="map"
      center={{ lat: 33.450701, lng: 126.570667 }}
      style={{ width: "100%", height: "100%" }}
      level={3}
    />
  );
};
