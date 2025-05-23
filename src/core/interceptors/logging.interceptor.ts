import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

/**
 * 요청과 응답을 로깅하는 인터셉터
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  /**
   * 요청을 인터셉트하고 로깅합니다.
   * @param context 실행 컨텍스트
   * @param next 호출 핸들러
   * @returns Observable
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url } = request;
    const now = Date.now();

    this.logger.log(`요청 시작: ${method} ${url}`);

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        this.logger.log(`요청 완료: ${method} ${url} - ${responseTime}ms`);
      }),
    );
  }
}
