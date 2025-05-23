import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/**
 * AppController 테스트 슈트
 */
describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = moduleFixture.get<AppController>(AppController);
  });

  describe('getHello 메서드', () => {
    it('환영 메시지를 반환해야 합니다', () => {
      // Given
      const expectedMessage = '안녕하세요! ClosetLink 백엔드 서버입니다.';

      // When
      const actualMessage = appController.getHello();

      // Then
      expect(actualMessage).toBe(expectedMessage);
    });
  });
});
