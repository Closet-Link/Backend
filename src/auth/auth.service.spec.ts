import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

/**
 * AuthService 테스트 슈트
 */
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const mockConfigServiceValue = {
      get: jest.fn(),
    };

    const mockJwtServiceValue = {
      sign: jest.fn(),
      verify: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: mockConfigServiceValue,
        },
        {
          provide: JwtService,
          useValue: mockJwtServiceValue,
        },
      ],
    }).compile();

    service = moduleFixture.get<AuthService>(AuthService);
  });

  describe('정의 확인', () => {
    it('서비스가 정의되어야 합니다', () => {
      expect(service).toBeDefined();
    });
  });
});
