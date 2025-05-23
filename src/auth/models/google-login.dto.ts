import { IsString, IsIn } from 'class-validator';

/**
 * Google 로그인 요청 DTO
 */
export class GoogleLoginDto {
  /** Google ID 토큰 */
  @IsString()
  idToken: string;

  /** 플랫폼 타입 */
  @IsIn(['ios', 'android'])
  platform: 'ios' | 'android';
}
