import BaseMap from "../../components/common/Map";
import type { Origin, Place, SortValue, WaitingCategoryKey } from "./types/waitingspot";
import type { MapMarker } from "../../types/map";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import { WaitingSpotLayout } from "./layouts/WaitingSpotLayout";
import { WaitingSpotHeader } from "./common/WaitingSpotHeader";
import { CategoryTab } from "./common/CategoryTab";
import { PlaceDetailPanel } from "./panels/PlaceDetailPanel";
import { waitingCategories } from "./common/constants";
import { FooterButton } from "./common/FooterButton";
import { StartLocationSearch } from "./components/StartLocationSearch";
import { PlaceList } from "./components/PlaceList";
import { useAuthStore } from "../../store/useAuthStore";
import LoadingSpinner from "../../components/common/loadingSpinner";
import { useWaitingSpot } from "./hooks/useWaitingSpot";
import { useFacilitiesSearch } from "./hooks/useFacilitiesSearch";
import { useDebounce } from "./hooks/useDebounce";
import { useWaitingSpotDetail } from "./hooks/useWaitingSpotDetail";
import { EmptyState } from "./common/EmptyState";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";

// GPS 좌표의 떨림 방지
const stabilize = (val?: number) => (val ? parseFloat(val.toFixed(4)) : undefined);

export default function WaitingSpot() {

  // 도보 길안내
  const navigate = useNavigate();

  // 1. 타입을 string으로 받거나, 명시적으로 단언하여 에러를 방지합니다.
  const { type } = useParams<{ type: string }>();

  // 2. 잘못된 경로(예: /spot/abc)로 들어왔을 때를 대비한 방어 로직
  const isFirst = type === 'first';
  const isLast = type === 'last';

  // 첫차도 막차도 아닌 경로일 경우 대시보드로 안내하거나 제목을 기본값으로 설정
  const pageTitle = isFirst ? "첫차 대기 장소" : isLast ? "막차 대기 장소" : "대기 장소 확인";

  const accessToken = useAuthStore((s) => s.accessToken);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  //상세 패널 open
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  //지도 현위치 좌표
  const { location, loading: mapLoading, refetch: mapRefetch } = useCurrentLocation();

  //출발지 검색
  const [origin, setOrigin] = useState<Origin | null>(null);

  //카테고리
  const [category, setCategory] = useState<WaitingCategoryKey>("ALL");

  //가까운순, 24시간 정렬
  const [sort, setSort] = useState<SortValue>("distance");

  // GPS 노이즈로 인한 무한 API 호출 방지
  const stabilizedLat = useMemo(() => stabilize(location?.lat), [location?.lat]);
  const stabilizedLng = useMemo(() => stabilize(location?.lng), [location?.lng]);

  //대기 장소 API
  const baseLat = origin?.lat ?? stabilizedLat;
  const baseLng = origin?.lng ?? stabilizedLng;

  const { places, isError, isLoading, refetch } = useWaitingSpot({
    lat: baseLat,
    lng: baseLng,
    sort: sort,
    category: category,
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

  //출발지 포함 대기 장소 리스트 -> 출발지 제외 리스트로 필터링
  const placeData: Place[] = useMemo(() => {
    const list = places ?? [];
    if (!origin) return list;
    return list.filter((p) => p.id !== origin.id);
  }, [places, origin]);

  //선택된 장소 id (카드 클릭 시 저장)
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  //대기 장소 상세 API
  const { placeDetail, DetailLoading, DetailError, refetchDetail } = useWaitingSpotDetail({
    lat: baseLat,
    lng: baseLng,
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

  //장소 리스트 선택
  const handleSelectPlace = useCallback((id: string) => {
  setSelectedPlaceId(id);
  setIsDetailOpen(true);
}, []);

  // 카테고리 변경 시 한 번에 처리
  const handleCategoryChange = useCallback((newCategory: WaitingCategoryKey) => {
    setCategory(newCategory);
    setSelectedPlaceId(null);
    setIsDetailOpen(false);
  }, []);

  //길찾기 시작 -> 도보 안내
  const endLat = placeDetail?.location.lat;
  const endLng = placeDetail?.location.lng;
  const startName = origin?.name ?? "현위치";
  const endName = placeDetail?.name;

  const onStartDirection = () => {
    if (!selectedPlaceId || !baseLat || !baseLng || !placeDetail) return;
    setIsDetailOpen(false);
    navigate(
      `/walking-direction/${selectedPlaceId}?startLat=${baseLat}&startLng=${baseLng}&endLat=${endLat}&endLng=${endLng}&endName=${endName}&startName=${startName}`,
      { replace: true }
    );
  }

  //좌표 사용 가능 여부 기준으로 분기
  const hasMapPoint = typeof baseLat === "number" && typeof baseLng === "number";

  return (
    <div className="min-h-dvh w-full">
      <WaitingSpotLayout
        header={<WaitingSpotHeader title={pageTitle} content={"막차를 놓쳐서 첫차까지 대기하시는 분들을\n위한 추천 장소를 안내드립니다."} />}
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
        controls={<CategoryTab selected={category} onChange={handleCategoryChange} categories={waitingCategories} />}
        list={!hasMapPoint ? (
          mapLoading ? (
            <div className="flex flex-col items-center justify-center">
              <LoadingSpinner />
              <p className="mt-2 text-sm text-gray-500">현재 위치를 찾는 중이에요…</p>
            </div>
          ) : (
            <EmptyState
              message="현재 위치를 불러오지 못했어요."
              actionLabel="다시 시도"
              onRetry={mapRefetch}
            />
          )
        ) :
          isLoading ? (
            <div className="flex h-full items-center justify-center mt-4">
              <LoadingSpinner />
            </div>
          ) : isError ? (
            <EmptyState
              className="pointer-events-none"
              message="장소를 불러오지 못했어요."
              actionLabel="다시 불러오기"
              onRetry={refetch}
            />
          ) : (
            <PlaceList
              places={placeData}
              selectedPlaceId={selectedPlaceId}
              onSelectPlaceId={handleSelectPlace}
              sort={sort}
              onChangeSort={setSort}
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
                handleSelectPlace(String(marker.id)); }}
              />}
        detail={isDetailOpen && selectedPlaceId ?
          <PlaceDetailPanel
            place={placeDetail ?? null}
            loading={DetailLoading}
            error={DetailError}
            refetch={refetchDetail}
          /> : null
        }
        onDetailBack={() => setIsDetailOpen(false)}
      />
    </div>
  );
}