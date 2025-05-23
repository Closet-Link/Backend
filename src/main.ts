import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

/**
 * 애플리케이션 부트스트랩 함수
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // 글로벌 유효성 검사 파이프 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
