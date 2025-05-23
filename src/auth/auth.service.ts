import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { EnvironmentVariables } from '../config/env.config';
import { UserPayload } from './models/user-payload.interface';
import { UserInfoDto } from './models/user-info.dto';

/**
 * 인증 관련 비즈니스 로직을 처리하는 서비스
 */
@Injectable()
export class AuthService {
  private readonly googleClient: OAuth2Client;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly jwtService: JwtService,
  ) {
    this.googleClient = new OAuth2Client();
  }

  /**
   * Google ID 토큰을 검증하고 JWT 토큰을 생성합니다.
   * @param idToken Google ID 토큰
   * @param platform 플랫폼 타입 (iOS 또는 Android)
   * @returns JWT 액세스 토큰
   */
  async validateGoogleToken(
    idToken: string,
    platform: 'ios' | 'android',
  ): Promise<string> {
    try {
      const clientId = this.getGoogleClientId(platform);
      const payload = await this.verifyGoogleToken(idToken, clientId);

      return this.createJwtToken({
        email: payload.email,
        sub: payload.sub,
        name: payload.name,
      });
    } catch {
      throw new UnauthorizedException('유효하지 않은 Google 토큰입니다.');
    }
  }

  /**
   * Google ID 토큰을 검증하고 JWT 토큰과 사용자 정보를 반환합니다.
   * @param idToken Google ID 토큰
   * @param platform 플랫폼 타입 (iOS 또는 Android)
   * @returns JWT 액세스 토큰과 사용자 정보
   */
  async validateGoogleTokenWithUserInfo(
    idToken: string,
    platform: 'ios' | 'android',
  ): Promise<{ accessToken: string; userInfo: UserInfoDto }> {
    try {
      const clientId = this.getGoogleClientId(platform);
      const payload = await this.verifyGoogleToken(idToken, clientId);

      const accessToken = this.createJwtToken({
        email: payload.email,
        sub: payload.sub,
        name: payload.name,
      });

      const userInfo: UserInfoDto = {
        email: payload.email,
        name: payload.name,
        nickname: payload.name, // 구글에서는 닉네임을 별도로 제공하지 않으므로 이름을 사용
      };

      return { accessToken, userInfo };
    } catch {
      throw new UnauthorizedException('유효하지 않은 Google 토큰입니다.');
    }
  }

  /**
   * 플랫폼에 따른 Google 클라이언트 ID를 반환합니다.
   * @param platform 플랫폼 타입
   * @returns Google 클라이언트 ID
   */
  private getGoogleClientId(platform: 'ios' | 'android'): string {
    return platform === 'ios'
      ? this.configService.get('GOOGLE_CLIENT_ID_IOS')!
      : this.configService.get('GOOGLE_CLIENT_ID_ANDROID')!;
  }

  /**
   * Google ID 토큰을 검증합니다.
   * @param idToken Google ID 토큰
   * @param clientId Google 클라이언트 ID
   * @returns 검증된 사용자 정보
   */
  private async verifyGoogleToken(
    idToken: string,
    clientId: string,
  ): Promise<UserPayload> {
    const ticket = await this.googleClient.verifyIdToken({
      idToken,
      audience: clientId,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email || !payload.name || !payload.sub) {
      throw new UnauthorizedException('토큰 페이로드가 유효하지 않습니다.');
    }

    return {
      email: payload.email,
      sub: payload.sub,
      name: payload.name,
    };
  }

  /**
   * JWT 토큰을 생성합니다.
   * @param payload 토큰에 포함될 사용자 정보
   * @returns 생성된 JWT 토큰
   */
  private createJwtToken(payload: UserPayload): string {
    return this.jwtService.sign(payload);
  }
}
