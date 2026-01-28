import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { WaitingSpotLayout } from "../../components/waitingspot/WaitingSpotLayout";
import { WaitingSpotHeader } from "../../components/waitingspot/common/WaitingSpotHeader";
import { CategoryTab } from "../../components/waitingspot/common/CategoryTab";
import BaseMap from "../../components/common/Map"; 
import type { Place, WaitingCategoryKey } from "../../types/waitingspot";
import { StartLocationSearch } from "../../components/waitingspot/StartLocationSearch";
import { PlaceList } from "../../components/waitingspot/PlaceList";
import { PlaceDetailPanel } from "../../components/waitingspot/PlaceDetailPanel";
import { FALLBACK_CENTER, waitingCategories } from "../../components/waitingspot/constants";
import WalkingDirections from "./WalkingDirections";
import { useGeoLocation } from "../../hooks/useGeoLocation"; 
import { mockPlaces } from "../../components/waitingspot/common/mock";
import type { MapMarker } from "../../types/map";

export default function WaitingSpot() {
  //지도 현위치 좌표
  const { location, loading, error } = useGeoLocation({
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  });

  // 1. 타입을 string으로 받거나, 명시적으로 단언하여 에러를 방지합니다.
  const { type } = useParams() as { type: string };

  // 2. 잘못된 경로(예: /spot/abc)로 들어왔을 때를 대비한 방어 로직
  const isFirst = type === 'first';
  const isLast = type === 'last';

  // 첫차도 막차도 아닌 경로일 경우 대시보드로 안내하거나 제목을 기본값으로 설정
  const pageTitle = isFirst ? "첫차 대기 장소" : isLast ? "막차 대기 장소" : "대기 장소 확인";

  const [category, setCategory] = useState<WaitingCategoryKey>("all");

  //선택된 장소 id (카드 클릭 시 저장)
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);

  const selectedPlace = useMemo<Place | null>(() => {
    return mockPlaces.find((p) => p.id === selectedPlaceId) ?? null;
  }, [selectedPlaceId]);

  // 마커 데이터 변환 
  const mapMarkers = useMemo<MapMarker[]>(() => {
    return mockPlaces.map(p => ({
      id: p.id,
      name: p.name,
      position: { lat: p.lat, lng: p.lng },
      variant: 'spot' 
    }));
  }, []);

  //지도 center 좌표 반영
  const center = useMemo(() => {
    if (selectedPlace) {
      return { lat: selectedPlace.lat, lng: selectedPlace.lng };
    } //리스트 장소
    if (location) {
      return { lat: location.latitude, lng: location.longitude };
    }//현위치
    return FALLBACK_CENTER;//임시 좌표
  }, [selectedPlace, location]);

  const handleSelectList = (id: number) => {
    setSelectedPlaceId(id);
    setIsDetailOpen(true);
  };

  //마커 클릭 -> 선택, 상세 열기
  const handleSelectMarker = (id: number) => {
    setSelectedPlaceId(id);
    setIsDetailOpen(true);
  };

  //출발지 검색
  const [origin, setOrigin] = useState<string>("현위치");
  const handleSubmitOrigin = (value: string) => {
    setOrigin(value);
  }

  const [isDetailOpen, setIsDetailOpen] = useState(false);

  //도보 안내 페이지 렌더링 유무
  const [showDirections, setShowDirections] = useState(false);

  if (showDirections) {
    return <WalkingDirections onBack={() => setShowDirections(false)} />;
  }

  return (
    <div className="min-h-dvh w-full overflow-hidden">
      <WaitingSpotLayout
        header={<WaitingSpotHeader title={pageTitle} content={"막차를 놓쳐서 첫차까지 대기하시는 분들을 위한 추천 장소를 안내드립니다."} />}
        search={<StartLocationSearch onSubmitOrigin={handleSubmitOrigin}/>}
        controls={<CategoryTab selected={category} onChange={setCategory} categories={waitingCategories} />}
        list={<PlaceList
          places={mockPlaces}
          selectedPlaceId={selectedPlaceId}
          onSelectPlaceId={handleSelectList}
        />}
        map={
          <BaseMap 
            markers={mapMarkers}
            activeId={selectedPlaceId}
            onMarkerClick={(marker) => handleSelectMarker(marker.id as number)}
          />
        }
        detail={isDetailOpen && selectedPlace ?
          <PlaceDetailPanel
            place={selectedPlace}
            onStartDirection={() => {
              setIsDetailOpen(false);
              setShowDirections(true);
            }}
          /> : null
        }
        onDetailBack={() => setIsDetailOpen(false)}
      />
    </div>
  );
}