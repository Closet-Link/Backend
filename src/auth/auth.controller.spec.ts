import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

/**
 * AuthController 테스트 슈트
 */
describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const mockAuthServiceValue = {
      validateGoogleToken: jest.fn(),
      validateGoogleTokenWithUserInfo: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthServiceValue,
        },
      ],
    }).compile();

    controller = moduleFixture.get<AuthController>(AuthController);
  });

  describe('정의 확인', () => {
    it('컨트롤러가 정의되어야 합니다', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('testAuthModule 메서드', () => {
    it('테스트 메시지를 반환해야 합니다', () => {
      // Given
      const expectedMessage = { message: '인증 모듈이 정상 작동중입니다.' };

      // When
      const actualMessage = controller.testAuthModule();

      // Then
      expect(actualMessage).toEqual(expectedMessage);
    });
  });
});
