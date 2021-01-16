import { Test, TestingModule } from '@nestjs/testing';
import { EnderecosService } from './enderecos.service';
import { EnderecosController } from './enderecos.controller';
import { getModelToken } from '@nestjs/sequelize';
import { Endereco } from './endereco.entity';

describe('EnderecosController', () => {
  let enderecosController: EnderecosController;

  const enderecosMockModel = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const AuthServiceMock = {};

  beforeEach(async () => {
    const enderecosModule: TestingModule = await Test.createTestingModule({
      controllers: [EnderecosController],
      providers: [
        EnderecosService,
        {
          provide: getModelToken(Endereco),
          useValue: enderecosMockModel,
        },
        {
          provide: 'AuthService',
          useValue: AuthServiceMock,
        },
      ],
    }).compile();

    enderecosController = enderecosModule.get<EnderecosController>(
      EnderecosController,
    );
  });

  it('Deve estar definido', () => {
    expect(enderecosController).toBeDefined();
  });
});
