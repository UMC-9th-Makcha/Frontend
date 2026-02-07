import BaseMap from "../../components/common/Map";
import type { Origin, Place, WaitingCategoryKey } from "../../types/waitingspot";
import type { MapMarker } from "../../types/map";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { WaitingSpotLayout } from "./layouts/WaitingSpotLayout";
import { WaitingSpotHeader } from "./common/WaitingSpotHeader";
import { CategoryTab } from "./common/CategoryTab";
import { PlaceDetailPanel } from "./panels/PlaceDetailPanel";
import { waitingCategories } from "./common/constants";
import WalkingDirections from "./WalkingDirections";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import { FooterButton } from "./common/FooterButton";
import { StartLocationSearch } from "./components/StartLocationSearch";
import { PlaceList } from "./components/PlaceList";
import { useAuthStore } from "../../store/useAuthStore";
import LoadingSpinner from "../../components/common/loadingSpinner";
import { useWaitingSpot } from "./hooks/useWaitingSpot";
import { useFacilitiesSearch } from "./hooks/useFacilitiesSearch";
import { useDebounce } from "./hooks/useDebounce";
import { useFacilitiesCategory } from "./hooks/useFacilitiesCategory";
import { useWaitingSpotDetail } from "./hooks/useWaitingSpotDetail";
import { EmptyState } from "./common/EmptyState";
import useToastStore from "../../store/useToastStore";

export default function WaitingSpot() {

  // 1. 타입을 string으로 받거나, 명시적으로 단언하여 에러를 방지합니다.
  const { type } = useParams() as { type: string };

  // 2. 잘못된 경로(예: /spot/abc)로 들어왔을 때를 대비한 방어 로직
  const isFirst = type === 'first';
  const isLast = type === 'last';

  // 첫차도 막차도 아닌 경로일 경우 대시보드로 안내하거나 제목을 기본값으로 설정
  const pageTitle = isFirst ? "첫차 대기 장소" : isLast ? "막차 대기 장소" : "대기 장소 확인";

  const accessToken = useAuthStore((s) => s.accessToken);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  //지도 현위치 좌표
  const { location, error } = useGeoLocation({
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  });

  //출발지 검색
  const [origin, setOrigin] = useState<Origin>(null);

  //대기 장소 API
  const baseLat = origin?.lat ?? location?.latitude;
  const baseLng = origin?.lng ?? location?.longitude;

  const { places, isError, isLoading, refetchAll } = useWaitingSpot({
    lat: baseLat,
    lng: baseLng,
    isHydrated,
    accessToken,
  });

  //검색 API
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 300);

  const { facilities, facilitiesLoading, facilitiesError } = useFacilitiesSearch({
    latitude: baseLat,
    longitude: baseLng,
    keyword: debouncedKeyword.trim(),
    isHydrated,
    accessToken,
  });
  const items = facilities?.facilities ?? [];

  //카테고리 API
  const [category, setCategory] = useState<WaitingCategoryKey>("ALL");

  const { categoryData, categoryLoading, categoryError, refetchCategory } = useFacilitiesCategory({
    category: category,
    latitude: baseLat,
    longitude: baseLng,
    isHydrated,
    accessToken,
  })

  const isAll = category === "ALL";

  //출발지 포함 대기 장소 리스트 -> 출발지 제외 리스트로 필터링
  const unfilteredData: Place[] = isAll
    ? (places ?? [])
    : (categoryData?.facilities ?? []);

  const placeData: Place[] = useMemo(() => {
    if (!origin) return unfilteredData;
    return unfilteredData.filter((p) => p.id !== origin.id);
    }, [unfilteredData, origin])

  const placeLoading = isAll ? isLoading : categoryLoading;
  const placeError = isAll ? isError : categoryError;
  const refetchPlaces = isAll ? refetchAll : refetchCategory;

  //선택된 장소 id (카드 클릭 시 저장)
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const selectedPlace = useMemo<Place | null>(() => {
    return placeData.find((p) => p.id === selectedPlaceId) ?? null;
  }, [placeData, selectedPlaceId]);

  //대기 장소 상세 API
  const { placeDetail, DetailLoading, DetailError, refetchDetail } = useWaitingSpotDetail({
    placeId: selectedPlaceId,
    isHydrated,
    accessToken,
  });

  // 마커 데이터 변환 
  const mapMarkers = useMemo<MapMarker[]>(() => {
    const placeMarkers: MapMarker[] = placeData.map(p => ({
      id: p.id,
      name: p.name,
      position: { lat: p.lat, lng: p.lng },
      variant: 'spot',
    }));

    if (origin) {
      placeMarkers.push({
        id: origin.id,
        name: origin.name,
        position: { lat: origin.lat, lng: origin.lng },
        variant: 'current',
      });
    }
    return placeMarkers;
  }, [placeData, origin]);

  const handleSelectList = (id: string) => {
    setSelectedPlaceId(id);
    setIsDetailOpen(true);
  };

  //마커 클릭 -> 선택, 상세 열기
  const handleSelectMarker = (id: string) => {
    setSelectedPlaceId(id);
    setIsDetailOpen(true);
  };

  //카테고리 변경 시 패널 및 마커 초기화
  useEffect(() => {
    setSelectedPlaceId(null);
    setIsDetailOpen(false);
  }, [category]);


  //길찾기 시작 -> 도보 안내 
  const onStartDirection = () => {
    setIsDetailOpen(false);
    setShowDirections(true);
  }

  const [isDetailOpen, setIsDetailOpen] = useState(false);

  //도보 안내 페이지 렌더링 유무
  const [showDirections, setShowDirections] = useState(false);

  //지도 error
  const addToast = useToastStore((s) => s.addToast);
  useEffect(() => {
    if (error) {
      addToast("현재 위치를 불러오지 못했어요.");
    }
  }, [error, addToast]);

  if (showDirections) {
    return <WalkingDirections onBack={() => setShowDirections(false)} />;
  }

  return (
    <div className="min-h-dvh w-full">
      <WaitingSpotLayout
        header={<WaitingSpotHeader title={pageTitle} content={"막차를 놓쳐서 첫차까지 대기하시는 분들을 위한 추천 장소를 안내드립니다."} />}
        search={<StartLocationSearch
          value={keyword}
          onChangeValue={setKeyword}
          items={items}
          loading={facilitiesLoading}
          error={facilitiesError}
          onSelect={(facility) => {
            setOrigin({ id: facility.id, name: facility.name, lat: facility.lat, lng: facility.lng });
          }}
        />
        }
        controls={<CategoryTab selected={category} onChange={setCategory} categories={waitingCategories} />}
        list={placeLoading ? (
          <div className="flex h-full items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : placeError ? (
          <EmptyState
            className="pointer-events-none"
            message="장소를 불러오지 못했어요."
            actionLabel="다시 불러오기"
            onRetry={() => refetchPlaces()}
          />
        ) : (
          <PlaceList
            places={placeData}
            selectedPlaceId={selectedPlaceId}
            onSelectPlaceId={handleSelectList}
          />
        )
        }
        footer={
          <FooterButton
            onClick={onStartDirection}
            content={`도보 길 안내 시작`} />
        }
        map={
          <BaseMap
            markers={mapMarkers}
            activeId={selectedPlaceId}
            onMarkerClick={
              (marker) => {
                if (marker.variant === "current") return;
                handleSelectMarker(String(marker.id)); }}
              />}
        detail={isDetailOpen && selectedPlaceId ?
          <PlaceDetailPanel
            place={placeDetail ?? null}
            loading={DetailLoading}
            error={DetailError}
            refetch={() => refetchDetail()}
          /> : null
        }
        onDetailBack={() => setIsDetailOpen(false)}
      />
    </div>
  );
}