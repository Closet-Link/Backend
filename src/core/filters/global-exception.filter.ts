import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * 전역 예외 처리 필터
 * 모든 예외를 캐치하고 일관된 에러 응답을 제공합니다.
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  /**
   * 예외를 처리하고 클라이언트에게 응답을 전송합니다.
   * @param exception 발생한 예외
   * @param host ArgumentsHost 객체
   */
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = this.getHttpStatus(exception);
    const message = this.getErrorMessage(exception);

    const errorResponse = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    this.logger.error(
      `HTTP Status: ${status} Error Message: ${message}`,
      exception instanceof Error ? exception.stack : exception,
    );

    response.status(status).json(errorResponse);
  }

  /**
   * 예외에서 HTTP 상태 코드를 추출합니다.
   * @param exception 예외 객체
   * @returns HTTP 상태 코드
   */
  private getHttpStatus(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  /**
   * 예외에서 에러 메시지를 추출합니다.
   * @param exception 예외 객체
   * @returns 에러 메시지
   */
  private getErrorMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      return exception.message;
    }
    return '내부 서버 오류가 발생했습니다.';
  }
}
