# ClosetLink 백엔드

ClosetLink 애플리케이션의 백엔드 API 서버입니다.

## 기술 스택

- **Framework**: NestJS
- **언어**: TypeScript
- **인증**: JWT + Google OAuth 2.0
- **검증**: class-validator
- **테스트**: Jest

## 프로젝트 구조

```
src/
├── auth/                   # 인증 모듈
│   ├── models/            # DTO 및 인터페이스
│   ├── auth.controller.ts # 인증 컨트롤러
│   ├── auth.service.ts    # 인증 서비스
│   └── auth.module.ts     # 인증 모듈
├── config/                # 설정 파일
│   ├── env.config.ts      # 환경 변수 타입
│   └── env.validation.ts  # 환경 변수 검증
├── core/                  # 핵심 모듈
│   ├── filters/          # 전역 필터
│   ├── guards/           # 가드
│   ├── interceptors/     # 인터셉터
│   └── core.module.ts    # 핵심 모듈
└── main.ts               # 애플리케이션 진입점
```

## 설치 및 실행

### 1. 의존성 설치
```bash
yarn install
```

### 2. 환경 변수 설정
`.env` 파일을 생성하고 다음 변수들을 설정하세요:

```bash
GOOGLE_CLIENT_ID_IOS=your_ios_client_id_here
GOOGLE_CLIENT_ID_ANDROID=your_android_client_id_here
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRATION=24h
PORT=3000
```

### 3. 개발 서버 실행
```bash
yarn start:dev
```

### 4. 프로덕션 빌드
```bash
yarn build
yarn start:prod
```

## 테스트

### 단위 테스트
```bash
yarn test
```

### E2E 테스트
```bash
yarn test:e2e
```

### 테스트 커버리지
```bash
yarn test:cov
```

## API 엔드포인트

### 인증
- `POST /auth/google` - Google 소셜 로그인
- `POST /auth/admin/test` - 인증 모듈 테스트

### 기본
- `GET /` - 서버 상태 확인

## 개발 규칙

이 프로젝트는 `nest-js-rules`를 따릅니다:

- 한국어로 코드 작성 및 문서화
- JSDoc으로 공개 클래스/메서드 문서화
- 모든 변수와 함수에 타입 선언
- kebab-case 파일명
- SOLID 원칙 준수
- 짧은 함수 (20줄 미만)
- Arrange-Act-Assert 테스트 패턴

## 라이센스

UNLICENSED