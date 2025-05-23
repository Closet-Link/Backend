import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';

/**
 * 환경 변수 검증을 위한 클래스
 */
class EnvironmentVariables {
  @IsString()
  GOOGLE_CLIENT_ID_IOS: string;

  @IsString()
  GOOGLE_CLIENT_ID_ANDROID: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRATION: string;
}

/**
 * 환경 변수를 검증합니다.
 * @param config 환경 변수 객체
 * @returns 검증된 환경 변수
 */
export function validateEnvironment(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(`환경 변수 검증 실패: ${errors.toString()}`);
  }

  return validatedConfig;
}
