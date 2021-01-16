import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  const AuthServiceMock = {};

  const JwtServiceMock = {};

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      imports: [],
      providers: [
        AppService,
        {
          provide: 'AuthService',
          useValue: AuthServiceMock,
        },
        {
          provide: 'JwtService',
          useValue: JwtServiceMock,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('deve estar definido"', () => {
    expect(appController).toBeDefined();
  });
});
