import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * 애플리케이션의 기본 컨트롤러
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * 애플리케이션 상태 확인을 위한 기본 엔드포인트
   * @returns 환영 메시지
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
