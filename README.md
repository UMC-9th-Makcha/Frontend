# Makcha - Frontend

## 📦 Library

본 프로젝트는 효율적인 협업과 빠른 기능 구현을 위해 아래 패키지들을 사용합니다.

### 🔹 Core (기반)
- **react-router-dom**: 페이지 간 이동(대시보드, 지도, 설정 등)을 관리합니다.
- **axios**: 서버 API 통신을 담당합니다.
- **@tanstack/react-query**: 서버 데이터 캐싱 및 실시간 데이터 업데이트(Polling)를 최적화합니다.
- **zustand**: 로그인 상태 및 사용자 설정 등 전역 상태를 관리합니다.
  * `isDarkMode`: 현재 테마 상태 (boolean)
  * `toggleDarkMode`: 테마 전환 함수

### 🔹 Features (기능)
- **react-kakao-maps-sdk**: 카카오맵 UI 구현 및 마커 표시를 위해 사용합니다.
- **date-fns**: "막차까지 남은 시간" 등 복잡한 시간 계산을 정확하게 처리합니다.
- **react-hook-form**: 알림 설정 등 복잡한 입력창의 데이터를 효율적으로 관리합니다.
- **lucide-react**: 서비스에 필요한 아이콘(검색, 뒤로가기, 설정 등) 세트입니다.

### 🔹 Styling & UX (UI/UX)
- **tailwindcss**: 유틸리티 우선 CSS 프레임워크로 빠른 스타일링을 지원합니다.
- **framer-motion**: 바텀 시트 및 페이지 전환 등 '앱' 같은 부드러운 애니메이션을 구현합니다.
- **vite-plugin-pwa**: 모바일 홈 화면 추가 및 푸시 알림 기반을 마련합니다.

---

### 📂 Project Structure

본 프로젝트는 유지보수와 확장성을 위해 아래와 같은 표준 폴더 구조를 준수합니다.

```text
src/
├── api/                                  # API 통신 (Axios instance 등)
├── assets/                               # 이미지, 아이콘(SVG)
├── components/                           # 공용 컴포넌트
│   ├── common/
│   │   ├── FAB/                          # FAB 
│   │   ├── HorizontalScroll/             # 공용 가로스크롤
│   │   ├── LoadingSpinner/               # 공용 로딩스피너
│   │   ├── Map/                          # 카카오 지도 컴포넌트
│   │   ├── Panel/                        # Panel, subPanel등 컨테이너 컴포넌트
│   │   ├── PolicyLinks/                  # 이용약관 관련 컴포넌트
│   │   └── Toast/                        # Toast 메세지 공용 컴포넌트
│   ├── dashboard/                        # 공용 대시보드 컴포넌트
│   │   └── components/
│   │       ├── DarkModeToggle.tsx        # 테마 전환 토글
│   │       ├── DashboardItem.tsx         # 내비게이션 메뉴 개별 아이템
│   │       ├── DashboardLayout.tsx       # 대시보드 레이아웃
│   │       ├── DashboardNav.tsx          # 내비게이션 메뉴
│   │       ├── MobileNav.tsx             # 모바일/PWA용 하단 탭 바
│   │       └── UserIcon.tsx              # 유저 프로필 이미지
│   └── kakao/
│       ├── KakaoButton.tsx               # 카카오 로그인 버튼
│       ├── KakaoCallback.tsx             # 카카오 로그인 콜백
│       └── KakaoRoute.tsx                # 로그인 라우팅 설정
├── hooks/                                # 전역 커스텀 훅
│   ├── useAuth.ts                        # 로그인 등 사용자 인증
│   ├── useCurrentLocation.ts             # 최초 사용자 위치 파악
│   ├── useGeoLocation.ts                 # 이동 중 사용자 위치 파악
│   └── usePWAInstall.ts                  # 모바일 PWA 어플 다운로드  
├── pages/
│   ├── Alarm/                            # 알림 설정 페이지
│   │  ├── components/
│   │  │  ├── DestinationCarousel.tsx     # 자주 쓰는 도착지를 카드로 보여줌
│   │  │  ├── FrequentRoutesCard.tsx      # 자주 가는 경로를 저장
│   │  │  ├── RecemtDestination.tsx       # 최근에 선택한 목적지
│   │  │  ├── RouteCard.tsx               # 이동 경로 하나를 요약, 츨력
│   │  │  ├── RouteTimeline.tsx           # 이동 과정을 출발부터 도착까지 출력
│   │  │  ├── SearchField.tsx             # 출발지·도착지 선택 시 검색 화면으로 이동
│   │  │  └── SegmentBar.tsx              # 구간별 소요 시간을 막대로 표시
│   │  ├── hooks/
│   │  │  ├── useAlarmFlow.ts             # 알림 flow 제어
│   │  │  └── usePickCurrentLocation.ts   # 사용자 위치 자동 입력
│   │  ├── panels/
│   │  │  ├── AlarmPanel.tsx              # 출발지·도착지 선택 UI
│   │  │  ├── AlarmPanelSwitch.tsx        # step에 따라 화면을 전환  
│   │  │  ├── AlarmSuccessPanel.tsx       # 알림 신청 완료 패널
│   │  │  ├── RouteConfirmPanel.tsx       # 경로 확인, 알림을 확정 
│   │  │  ├── RouteLoadingPanel.tsx       # 경로 탐색 중 로딩 패널
│   │  │  └── RouteResultPanel.tsx        # 추천 경로 목록 
│   │  ├── sheets/                        # 장소 검색 시트
│   │  ├── types/
│   │  │  ├── alarm.ts                    # 알림 설정 타입
│   │  │  ├── destination.ts              # 도착지 타입
│   │  │  ├── place.ts                    # 장소 타입
│   │  │  ├── routeConfirm.ts             # 경로 타입
│   │  │  └── search.ts                   # 검색 타입
│   │  ├── constant.ts                    # 타입 상수화
│   │  └── KakaoMapView.tsx               # 지도에 경로 표시
│   ├── Download/                         # 다운로드 페이지
│   │  ├── components/
│   │  │  ├── DownloadButton.tsx          # 다운로드 페이지 버튼 컴포넌트
│   │  │  └── DownloadHero.tsx            # 다운로드 페이지 뒷 배경
│   │  └── types/
│   │     └── download.ts                 # props 등 필요 타입
│   ├── Error/                            # 에러 페이지
│   ├── History/                          # 알림 내역 페이지
│   │  ├── components/
│   │  │  ├── CurrentAlarmCard.tsx        # 현재 막차 알림 요약
│   │  │  ├── EmptyHistoryCard.tsx        # 알림 내역이 없을 때 표시
│   │  │  ├── MonthSection.tsx            # 월별 알림 내역
│   │  │  ├── PastSummaryCard.tsx         # 이번 달 절약 금액 요약 카드
│   │  │  ├── SaveReportGraph.tsx         # 월별 절약 금액 그래프
│   │  │  └── SaveReportPanel.tsx         # 절약 리포트, 상세 내역
│   │  └── types/
│   │  │  └── history.tsx                 # 알림애 필요한 타입
│   ├── Home/                             # 홈(대시보드) 페이지
│   │  ├── types/
│   │  │  └── home.tsx                    # 인터페이스 설정
│   │  └── constant.ts                    # 대시보드 공용 버튼정보 상수
│   ├── Main/                             # 메인(카카오 로그인) 페이지
│   │  └── components/
│   │     ├── MainBg.tsx                  # 메인페이지 배경
│   │     └── MainPanel.tsx               # 패널 설정
│   ├── Setting/                          # 설정 페이지
│   │  ├── components/
│   │  │  ├── AccountSection.tsx          # 패널 계정설정 부분
│   │  │  ├── AlarmSection.tsx            # 패널 알림설정 부분
│   │  │  ├── BgSection.tsx               # 배경 설정
│   │  │  ├── PhonenumberSetting.tsx      # 패널 전화번호 설정 서브패널
│   │  │  ├── PlaceSection.tsx            # 패널 장소 설정 부분
│   │  │  ├── PlaceSetting.tsx            # 홈, 자주가는 장소 설정
│   │  │  └── SettingPanel.tsx            # 패널 설정
│   │  ├── hooks/
│   │  │  └── useBack.ts                  # 뒤로가기 시 이전 화면으로 이동
│   │  └── types/
│   │  │  └── setting.ts                  # props 및 Place 등 사용되는 인터페이스 설정
│   └── WaitingSpot/                      # 대기 장소 페이지
│      ├── WalkingDirections.tsx          # 도보 안내 페이지 (경로 탐색 및 화면 전환 전반의 플로우 관리)
│      ├── common/
│      │  ├── CategoryTab.tsx             # 카테고리 선택 탭 UI
│      │  ├── FooterButton.tsx            # 하단 주요 버튼
│      │  ├── InputDropdown.tsx           # 입력 자동완성 드롭다운
│      │  ├── MobileBottomSheet.tsx       # 모바일 바텀시트(드래그/스냅 레이아웃)
│      │  ├── StepIcon.tsx                # 도보 안내 step 타입별 아이콘 매핑
│      │  ├── WaitingSpotHeader.tsx       # 페이지 헤더(타이틀/설명)
│      │  ├── constants.ts                # 카테고리/기본값 등 공통 상수
│      │  └── mock.ts                     # API 연동 전 임시(mock) 데이터
│      ├── components/
│      │  ├── DirectionCard.tsx           # 경로 요약 카드 UI
│      │  ├── DirectionDetailCard.tsx     # 경로 step(상세 안내) 카드
│      │  ├── DirectionList.tsx           # 경로 리스트
│      │  ├── DirectionSearch.tsx         # 도보 안내 출발지 입력
│      │  ├── PlaceCard.tsx               # 대기 장소 카드 UI
│      │  ├── PlaceList.tsx               # 대기 장소 리스트 및 선택 처리
│      │  ├── SortToggle.tsx              # 대기 장소 정렬 토글 (가까운 순/24시간)
│      │  └── StartLocationSearch.tsx     # 대기 장소 출발지 입력
│      ├── layouts/
│      │  ├── WaitingSpotLayout.tsx       # 첫차 대기 장소 레이아웃
│      │  └── WalkingDirectionLayout.tsx  # 도보 안내 페이지 레이아웃
│      ├── maps/
│      │  ├── DirectionMap.tsx            # 첫차 대기 장소 지도 렌더링
│      │  └── WaitingSpotMap.tsx          # 도보 안내 지도 렌더링
│      └── panels/
│         ├── DirectionDetailPanel.tsx    # 도보 안내의 길찾기 패널
│         └── PlaceDetailPanel.tsx        # 첫차 대기 장소 상세 정보 패널
├── store/                                # Zustand 전역 상태 관리
│   ├── useAuthStore.ts                    사용자 정보(로그인, 전화번호 등) 상태
│   ├── useDashboardStore.ts              # 대시보드 상태 (모바일 등)
│   ├── useMediaQuery.ts                  # 브라우저 크기 파악
│   ├── usePhonConfirmStore.ts            # 전화번호 인증
│   ├── useSettingStore.ts                # 설정 페이지 관련 상태 (장소, 알림 등)
│   ├── useToastStore.ts                  # 토스트 알림
│   └── useUIStore.ts                     # 다크모드 관련 상태
├── styles/                               # 전역 스타일 및 Tailwind 설정
├── types/                                # 공통 TypeScript 타입 및 인터페이스 정의
├── utils/
│   └── auth.ts                           #카카오 로그인 인증 URL 설정
├── App.tsx                               # 라우팅 설정 및 다크모드, 인증 가드 관리
├── main.tsx                              # 전역 Provider 설정 및 PWA 서비스 워커 등록
├── sw.ts                                 # PWA 서비스 워커
└── vite-env.d.ts                         # 환경변수, PWA 등 전용 타입 정리
```

---

### 🛣 Routing Map

모든 라우팅은 `App.tsx`에서 중앙 집중식으로 관리됩니다.

| Page Name | Path | Description |
| :--- | :--- | :--- |
| **메인** | `/` | 서비스 소개 및 카카오 로그인 |
| **홈** | `/home` | 실시간 막차 정보 대시보드 |
| **알림 설정** | `/alarm` | 알림 시간 및 조건 설정 |
| **대기 장소** | `/spot/:type` | `first` 또는 `last` 파라미터로 지도 표시 |
| **알림 내역** | `/history` | 과거 도착 및 알림 로그 |
| **환경 설정** | `/setting` | 사용자 계정 및 서비스 설정 |
| **앱 설치** | `/download` | PWA 앱 설치 안내 페이지 |

---

### 💡 Development Guidelines

* **Colocation**: 특정 페이지에서만 사용되는 컴포넌트나 훅은 해당 페이지 폴더(`pages/FolderName/components/`) 내에서 관리합니다.
* **Naming**: 컴포넌트 파일은 `index.tsx`로 생성하여 임포트 경로를 간결하게 유지합니다.
* **Routing**: 페이지 이동 시 `react-router-dom`의 `Link` 또는 `useNavigate`를 사용하여 CSR(Client Side Rendering)을 유지합니다.

---

## ⌨️ Coding Conventions

팀 프로젝트의 코드 일관성을 위해 아래 규칙을 준수합니다.

### 1. Naming Conventions

* **Components / Pages**: `PascalCase`를 사용합니다. (예: `LastBusAlarm.tsx`, `DashboardMain.tsx`)
* **Hooks / Functions / Variables**: `camelCase`를 사용합니다. (예: `useAuth`, `getBusTime`)
* **Constants**: `SNAKE_UPPER_CASE`를 사용합니다. (예: `KAKAO_AUTH_URL`)
* **Files**: 폴더의 진입점은 항상 `index.tsx`로 작성하여 임포트 경로를 최적화합니다.

### 2. React & TypeScript

* **Functional Components**: 모든 컴포넌트는 **화살표 함수(`const Component = () => {}`)** 형식을 우선하여 정의합니다.
* **Props Typing**: 컴포넌트 Props는 인라인보다는 별도의 `interface` 또는 `type`으로 정의합니다.
* **Hooks**: 로직이 3줄 이상 복잡해지면 해당 페이지의 `hooks/` 폴더로 분리합니다.

### 3. Styling (Tailwind CSS v4)

* **Utility-First**: 별도의 CSS 파일 작성 없이 Tailwind 클래스로만 스타일링하는 것을 원칙으로 합니다.
* **Theme Colors**: 색상 지정 시 하드코딩된 Hex 값 대신 정의된 테마 컬러를 사용합니다. (예: `text-makcha-yellow-500`)
* **Conditional Styling**: 클래스 결합 시 `clsx` 또는 `tailwind-merge` 라이브러리를 활용합니다.
* **Dark Mode Implementation**: 
    * 본 프로젝트는 `class` 전략을 사용합니다. 다크모드 상태는 `UIStore`에서 관리하며, `<html>` 태그에 `.dark` 클래스가 주입됩니다.
    * **스타일 적용**: `dark:` 프리픽스를 사용하여 다크모드 전용 색상을 지정합니다. 
        * 예시: `bg-white dark:bg-makcha-navy-900`
    * **전환 애니메이션**: 테마 변경 시 시각적 일관성을 위해 모든 색상 변화에 `transition-colors duration-300`을 적용합니다. 
        * index.css의 @layer base에 전역 transition이 적용되어 있어, 개별 컴포넌트에서 transition-colors를 중복 선언하지 않습니다.
        * 특정 요소에서 더 빠르거나 느린 애니메이션이 필요한 경우에만 개별 클래스(duration-150 등)를 추가합니다.

### 4. Component Structure (Colocation)

* **Local over Global**: 특정 페이지에서만 쓰이는 컴포넌트는 `src/components`가 아닌 해당 페이지 폴더 내 `components/`에 위치시킵니다.
* **Zustand**: 전역 상태는 최소화하며, `src/store` 내에서 기능별로 분리하여 관리합니다.

---

## 🚀 Git Workflow & Convention

협업의 효율성과 추적 가능성을 위해 GitHub Issue 기반의 워크플로우를 준수합니다.

### 1. GitHub Issue & Labels

작업 시작 전 반드시 이슈를 생성하고, 작업 성격에 맞는 **Label(라벨)**을 지정합니다.

* **Labels (Issue Types)**:

  * `✨ feat`: 새로운 기능 추가
  * `🐛 fix`: 버그 및 오류 수정
  * `🎨 design`: UI 스타일링 및 CSS 작업
  * `♻️ refactor`: 코드 리팩토링 (기능 변화 없음)
  * `📝 docs`: 문서 수정 (README 등)
  * `⚙️ chore`: 빌드 설정, 패키지 관리 등
  * `✅ test`: 테스트 코드 작성 및 수정

### 2. Branch Naming Convention

브랜치는 생성된 이슈 번호와 라벨, 본인 이름 이니셜을 조합하여 명명합니다.

* **Format**: `이슈번호_이니셜_라벨(이모지 제외)`
* **Example**:
  * `1_bj_feat`
  * `5_iy_design`
  * `12_my_fix`

### 3. Commit Message

커밋 메시지는 라벨을 앞에 두고 이슈 번호와 내용을 작성합니다.

* **Format**: `이슈번호. 라벨 : 작업내용`
* **Example**:
  * `5. ✨ feat : 카카오 로그인 버튼 UI 구현`
  * `12. 🎨 design : 대시보드 레이아웃 작업`
  * `118. 🐛 fix : 타이머 1초 지연 오류 수정`

### 4. Pull Request (PR)

* 작업을 완료한 브랜치는 `develop`으로 PR을 보냅니다.
* PR 내용에 `Closes #이슈번호`를 작성하여 머지 시 관련 이슈가 자동으로 닫히도록 합니다.


### 5. 🗣 Code Review Policy

* **리뷰 방식**: 주간 온라인 회의를 통한 코드 리뷰 진행을 원칙으로 합니다.
* **상시 리뷰**: 정기 회의까지 일정이 많이 남았거나 코드에 수정사항이 필요한 경우 github comment를 활용합니다.
* develop 및 main으로의 브랜치 Merge는 전체 상의 후 적용합니다.
---

## 🎨 Design Tokens (Color Palette)

본 프로젝트는 아래 정의된 컬러 시스템을 준수합니다. 모든 색상은 Tailwind CSS v4 설정(`@theme`)을 통해 `makcha-` 접두사로 사용 가능합니다.

### 🌑 Navy Palette
| Name | Hex Code |
| :--- | :--- |
| `makcha-navy-900` | `#00163D` |
| `makcha-navy-800` | `#183C7B` |
| `makcha-navy-600` | `#4674C6` |
| `makcha-navy-400` | `#86AFF7` |
| `makcha-navy-200` | `#D0E1FF` |

### 🌕 Yellow Palette
| Name | Hex Code |
| :--- | :--- |
| `makcha-yellow-500` | `#FFC300` |
| `makcha-yellow-400` | `#FFCE2F` |
| `makcha-yellow-300` | `#FFDC69` |
| `makcha-yellow-200` | `#FFE99F` |

---

## 👥 Team & Roles

| Category | Name | Initial | Description |
| :--- | :--- | :--- | :--- |
| **PM** | `서낙원` | `-` | 서비스 기획, 검수 |
| **FE Lead** | `백병재` | `bj` | 프로젝트 아키텍처 설계, 카카오 로그인/인증 로직 총괄 및 API 인스턴스 관리 |
| **FE Developer** | `김인영` | `iy` | 대기 장소(Waiting Spot) 담당: 카카오 맵 API 연동, 실시간 위치 표시 및 UI 구현 |
| **FE Developer** | `이미연` | `my` | 막차 알림(Alarm) 담당: 알림 설정 UI, 시간 계산 로직 및 서버 데이터 폴링 처리 |

---

## 🛠 Tech Stack

프로젝트 실행을 위한 주요 패키지 버전 정보입니다.

| Category | Library | Version | Description |
| :--- | :--- | :--- | :--- |
| **Framework** | `React` | `19.2.3` | UI 라이브러리 |
| **Build Tool** | `Vite` | `7.3.0` | 프론트엔드 빌드 도구 |
| **Styling** | `Tailwind CSS` | `4.1.18` | 유틸리티 퍼스트 CSS 프레임워크 (v4) |
| **Routing** | `React Router` | `7.11.0` | 클라이언트 사이드 라우팅 |
| **State** | `Zustand` | `5.0.9` | 전역 상태 관리 |
| **Data Fetching** | `React Query` | `5.90.12` | 서버 데이터 캐싱 및 동기화 |
| **Package** | `pnpm` | `^10.0.0` | 패키지 매니저 |
| **Language** | `TypeScript` | `5.9.3` | 정적 타입 시스템 |
| **API** | `Axios` | `1.13.2` | HTTP 통신 라이브러리 |
| **Map** | `Kakao Maps SDK` | `1.2.0` | 카카오 지도 서비스 연동 |
| **Form** | `React Hook Form` | `7.69.0` | 폼 상태 및 유효성 관리 |
| **Animation** | `Framer Motion` | `12.23.26` | 선언적 애니메이션 구현 |
| **Utility** | `Date-fns` | `4.1.0` | 날짜 및 시간 조작 유틸리티 |
| **Icons** | `Lucide React` | `0.562.0` | 아이콘 라이브러리 |