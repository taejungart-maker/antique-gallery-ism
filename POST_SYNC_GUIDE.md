# 예화월드 코드 동기화 후 필수 체크리스트 (Antigravity 전용 가이드)

프로젝트 코드가 Figma Make 등을 통해 업데이트(초기화)된 후, Antigravity가 이 파일을 읽고 다음 사항들을 자동으로 점검하고 복구합니다.

## 1. 전역 설정 복구
- **PostCSS 확장자 변경**: `postcss.config.js`가 생기면 즉시 `postcss.config.cjs`로 이름을 변경합니다.
- **문법 수정**: 파일 내용을 ES Module 방식에서 CommonJS(`module.exports`) 방식으로 수정합니다.
- **필수 플러그인**: `@tailwindcss/postcss`와 `autoprefixer`가 포함되어 있는지 확인합니다.

## 2. 파일 중복 및 충돌 방지
- **ArchiveCard 파일 정리**: `ArchiveCard.ts`와 `ArchiveCard.tsx`가 동시에 존재할 경우, `.ts` 파일을 삭제하고 `.tsx`로 단일화합니다.
- **컴포넌트 구조**: 모든 UI 컴포넌트는 `.tsx` 확장자를 우선 사용합니다.

## 3. 핵심 디자인/기능 보존
- **Typography**: `index.css` 상단의 Google Fonts 임포트와 전역 폰트(Montserrat, Playfair Display) 설정을 다시 적용합니다.
- **Cache Buster**: `App.tsx` 상단의 버전 정보(`2.0.7`) 및 ULTRA CACHE KILLER 로직이 삭제되었다면 복구합니다.
- **Logo Size**: 헤더와 푸터의 로고 크기(36px) 및 반응형 스타일을 검검합니다.

## 4. 실행 환경 확인
- **의존성 설치**: `pnpm install`을 실행하여 누락된 패키지가 없는지 확인합니다.
- **빌드 테스트**: `pnpm build`를 통해 최종 빌드 오류가 없는지 검증합니다.
