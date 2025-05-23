import { Injectable } from '@nestjs/common';

/**
 * 애플리케이션의 기본 서비스
 */
@Injectable()
export class AppService {
  /**
   * 환영 메시지를 반환합니다.
   * @returns 환영 메시지
   */
  getHello(): string {
    return '안녕하세요! ClosetLink 백엔드 서버입니다.';
  }
}
