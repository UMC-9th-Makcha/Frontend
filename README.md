# Makcha - Frontend

## 📦 Library

본 프로젝트는 효율적인 협업과 빠른 기능 구현을 위해 아래 패키지들을 사용합니다.

### 🔹 Core (기반)
- **react-router-dom**: 페이지 간 이동(대시보드, 지도, 설정 등)을 관리합니다.
- **axios**: 서버 API 통신을 담당합니다.
- **@tanstack/react-query**: 서버 데이터 캐싱 및 실시간 데이터 업데이트(Polling)를 최적화합니다.
- **zustand**: 로그인 상태 및 사용자 설정 등 전역 상태를 관리합니다.

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
├── api/          # API 통신 (Axios instance 및 엔드포인트별 함수 정의)
├── components/   # 공용 컴포넌트 (2개 이상의 페이지에서 재사용되는 UI)
│   └── dashboard/# 여러 페이지에서 호출되는 대시보드 공용 컴포넌트
├── hooks/        # 전역 Custom Hooks (Auth 확인, 공용 로직 등)
├── pages/        # 각 URL 경로별 페이지 컴포넌트
│   ├── Main/     # 0. 메인 랜딩 및 카카오 로그인 페이지
│   ├── Home/     # 1. 홈 (공용 대시보드)
│   ├── Alarm/    # 2. 막차 알림 설정
│   ├── WaitingSpot/ # 3. 대기 장소 확인 (지도 뷰 / 동적 라우팅)
│   ├── History/  # 4. 알림 내역 로그
│   ├── Setting/ # 5. 서비스 및 계정 설정
│   └── Download/ # 6. 앱 다운로드 안내
├── store/        # Zustand 전역 상태 관리 (AuthStore, UIStore 등)
├── styles/       # 전역 스타일 및 Tailwind v4 설정
├── types/        # 공통 TypeScript 타입 및 인터페이스 정의
├── utils/        # 공통 유틸리티 함수 (Time 계산 등)
├── App.tsx       # 중앙 집중식 라우팅 설정
└── main.tsx      # 앱 엔트리 포인트 (SDK 및 전역 설정 초기화)
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
| :--- | :--- | :--- |
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