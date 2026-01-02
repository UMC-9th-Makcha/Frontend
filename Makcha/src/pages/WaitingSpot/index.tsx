import { useParams } from "react-router-dom";
import { useState } from "react";
import { WaitingSpotLayout } from "../../components/waitingspot/WaitingSpotLayout";
import { WaitingSpotHeader } from "../../components/waitingspot/WaitingSpotHeader";
import { CategoryTab } from "../../components/waitingspot/CategoryTab";
import { WaitingSpotMap } from "../../components/waitingspot/WaitingSpotMap";
import type { CategoryKey, Place } from "../../types/waitingspot";
import { StartLocationSearch } from "../../components/waitingspot/StartLocationSearch";
import { PlaceList } from "../../components/waitingspot/PlaceList";

export const mockPlaces: Place[] = [
  {
    id: 1,
    name: "24시 별빛 카페",
    category: "night-cafe",
    address: "서울 용산구 한강대로",
    distanceMeter: 400,
    durationSeconds: 90,
    badge: "곧 마감 04:00까지 운영"
  },
  {
    id: 2,
    name: "용산 PC존",
    category: "pc-cafe",
    address: "서울 용산구 이태원로",
    distanceMeter: 400,
    durationSeconds: 90,
    badge: "곧 마감 04:00까지 운영"
  },
  {
    id: 3,
    name: "한강 사우나",
    category: "sauna",
    address: "서울 용산구 서빙고로",
    distanceMeter: 400,
    durationSeconds: 90,
    badge: "곧 마감 04:00까지 운영"
  },
  {
    id: 4,
    name: "미드나잇 스터디 카페",
    category: "night-cafe",
    address: "서울 용산구 후암로",
    distanceMeter: 400,
    durationSeconds: 90,
    badge: "곧 마감 04:00까지 운영"
  },
];

export default function WaitingSpot() {
  // 1. 타입을 string으로 받거나, 명시적으로 단언하여 에러를 방지합니다.
  const { type } = useParams() as { type: string };
  
  // 2. 잘못된 경로(예: /spot/abc)로 들어왔을 때를 대비한 방어 로직
  const isFirst = type === 'first';
  const isLast = type === 'last';

  // 첫차도 막차도 아닌 경로일 경우 대시보드로 안내하거나 제목을 기본값으로 설정
  const pageTitle = isFirst ? "첫차 대기 장소" : isLast ? "막차 대기 장소" : "대기 장소 확인";

  const [category, setCategory] = useState<CategoryKey>("all");

  return (
    <div className="h-full min-h-0 min-w-0">
      <WaitingSpotLayout
        header={<WaitingSpotHeader title={pageTitle} />}
        search={<StartLocationSearch />}
        controls={<CategoryTab selected={category} onChange={setCategory} />}
        list={<PlaceList places={mockPlaces}/>}
        map={<WaitingSpotMap />}
      />
    </div>
  );
}