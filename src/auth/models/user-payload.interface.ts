/**
 * JWT 토큰에 포함되는 사용자 정보
 */
export interface UserPayload {
  /** 사용자 이메일 */
  email: string;
  /** Google 사용자 ID */
  sub: string;
  /** 사용자 이름 */
  name: string;
}
