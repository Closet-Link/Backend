/**
 * 애플리케이션에서 사용하는 환경 변수들의 타입 정의
 */
export interface EnvironmentVariables {
  /** iOS용 Google 클라이언트 ID */
  GOOGLE_CLIENT_ID_IOS: string;
  /** Android용 Google 클라이언트 ID */
  GOOGLE_CLIENT_ID_ANDROID: string;
  /** JWT 서명을 위한 비밀키 */
  JWT_SECRET: string;
  /** JWT 토큰 만료 시간 */
  JWT_EXPIRATION: string;
}
