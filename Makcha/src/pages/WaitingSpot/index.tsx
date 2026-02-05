import BaseMap from "../../components/common/Map"; 
import type { Place, WaitingCategoryKey } from "../../types/waitingspot";
import type { MapMarker } from "../../types/map";
import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { WaitingSpotLayout } from "./layouts/WaitingSpotLayout";
import { WaitingSpotHeader } from "./common/WaitingSpotHeader";
import { CategoryTab } from "./common/CategoryTab";
import { PlaceDetailPanel } from "./panels/PlaceDetailPanel";
import { waitingCategories } from "./common/constants";
import WalkingDirections from "./WalkingDirections"; 
import { mockPlaces } from "./common/mock";
import { FooterButton } from "./common/FooterButton";
import { StartLocationSearch } from "./components/StartLocationSearch";
import { PlaceList } from "./components/PlaceList";

export default function WaitingSpot() {

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
  const [, setOrigin] = useState<string>("현위치");
  const handleSubmitOrigin = (value: string) => {
    setOrigin(value);
  }

  //길찾기 시작 -> 도보 안내 
  const onStartDirection = () => {
    setIsDetailOpen(false);
    setShowDirections(true);
  }

  const [isDetailOpen, setIsDetailOpen] = useState(false);

  //도보 안내 페이지 렌더링 유무
  const [showDirections, setShowDirections] = useState(false);

  if (showDirections) {
    return <WalkingDirections onBack={() => setShowDirections(false)} />;
  }

  return (
    <div className="min-h-dvh w-full">
      <WaitingSpotLayout
        header={<WaitingSpotHeader title={pageTitle} content={"막차를 놓쳐서 첫차까지 대기하시는 분들을 위한 추천 장소를 안내드립니다."} />}
        search={<StartLocationSearch onSubmitOrigin={handleSubmitOrigin}/>}
        controls={<CategoryTab selected={category} onChange={setCategory} categories={waitingCategories} />}
        list={<PlaceList
          places={mockPlaces}
          selectedPlaceId={selectedPlaceId}
          onSelectPlaceId={handleSelectList}
        />}
        footer={
          <FooterButton
          onClick={onStartDirection}
          content={`도보 길 안내 시작`}/>
        }
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
          /> : null
        }
        onDetailBack={() => setIsDetailOpen(false)}
      />
    </div>
  );
}