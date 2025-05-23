import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserPayload } from '../../auth/models/user-payload.interface';

/**
 * 사용자 정보가 포함된 요청 타입
 */
interface AuthenticatedRequest extends Request {
  user: UserPayload;
}

/**
 * JWT 토큰 인증을 담당하는 가드
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * 요청의 JWT 토큰을 검증합니다.
   * @param context 실행 컨텍스트
   * @returns 인증 성공 여부
   */
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('토큰이 제공되지 않았습니다.');
    }

    try {
      const payload: unknown = this.jwtService.verify(token);

      if (this.isValidUserPayload(payload)) {
        request.user = payload;
        return true;
      }

      throw new UnauthorizedException('유효하지 않은 토큰 페이로드입니다.');
    } catch {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
  }

  /**
   * 헤더에서 JWT 토큰을 추출합니다.
   * @param request HTTP 요청 객체
   * @returns 추출된 토큰 또는 undefined
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  /**
   * payload가 유효한 UserPayload인지 확인합니다.
   * @param payload 확인할 payload
   * @returns UserPayload 타입 가드 결과
   */
  private isValidUserPayload(payload: unknown): payload is UserPayload {
    return (
      typeof payload === 'object' &&
      payload !== null &&
      'email' in payload &&
      'sub' in payload &&
      'name' in payload
    );
  }
}
