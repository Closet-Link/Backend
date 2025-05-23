import { UserInfoDto } from './user-info.dto';

/**
 * 인증 성공 응답 DTO
 */
export class AuthResponseDto {
  /** JWT 액세스 토큰 */
  access_token: string;

  /** 사용자 정보 */
  user: UserInfoDto;
}
