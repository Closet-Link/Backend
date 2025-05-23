import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleLoginDto } from './models/google-login.dto';
import { AuthResponseDto } from './models/auth-response.dto';

/**
 * 인증 관련 요청을 처리하는 컨트롤러
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Google 소셜 로그인을 처리합니다.
   * @param body Google 로그인 요청 정보
   * @returns JWT 액세스 토큰과 사용자 정보
   */
  @Post('google')
  async authenticateWithGoogle(
    @Body() body: GoogleLoginDto,
  ): Promise<AuthResponseDto> {
    const { accessToken, userInfo } = 
      await this.authService.validateGoogleTokenWithUserInfo(
        body.idToken,
        body.platform,
      );

    return { 
      access_token: accessToken,
      user: userInfo,
    };
  }

  /**
   * 관리자용 테스트 엔드포인트
   * @returns 테스트 성공 메시지
   */
  @Post('admin/test')
  testAuthModule(): { message: string } {
    return { message: '인증 모듈이 정상 작동중입니다.' };
  }
}
