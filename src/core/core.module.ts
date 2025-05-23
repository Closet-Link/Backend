import { Module, Global } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

/**
 * 전역적으로 사용되는 NestJS 아티팩트들을 관리하는 Core 모듈yarn add @react-native-async-storage/async-storage
 */
@Global()
@Module({
  imports: [JwtModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    JwtAuthGuard,
  ],
  exports: [JwtAuthGuard],
})
export class CoreModule {}
