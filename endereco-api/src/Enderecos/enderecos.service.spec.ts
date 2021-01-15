import { Endereco } from './endereco.entity';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { EnderecosService } from './enderecos.service';
import TestUtil from '../common/testes/TestUtil';

describe('EnderecosService', () => {
  let enderecosService: EnderecosService;

  const enderecosMockModel = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnderecosService,
        {
          provide: getModelToken(Endereco),
          useValue: enderecosMockModel,
        },
      ],
    }).compile();

    enderecosService = module.get<EnderecosService>(EnderecosService);
  });
  it('Serviço deve estar definido', () => {
    expect(enderecosService).toBeDefined();
  });

  it('Deve listar todos os usuarios', async () => {
    const endereco = TestUtil.fornecaMeEnderecosValidos(2);

    enderecosMockModel.findAll.mockReturnValue(endereco);

    const enderecoRetornado = await enderecosService.obterTodos();

    expect(enderecoRetornado.status).toEqual(200);
    expect(enderecoRetornado.endereco).toHaveLength(2);
  });

  it('Deve listar o usuario filtrado', async () => {
    const endereco = TestUtil.fornecaMeEnderecosValidos(1);
    let id = 0;
    enderecosMockModel.findOne.mockReturnValue(endereco);

    if (endereco.id) {
      id = endereco.id;
    } else {
      id = endereco[0].id;
    }

    const enderecoRetornado = await enderecosService.obterPorId(String(id));

    expect(enderecoRetornado.status).toEqual(200);
    expect(enderecoRetornado.endereco).toEqual(endereco);
  });

  it('Criar um usuario', async () => {
    const endereco = TestUtil.fornecaMeEnderecosValidos(1);

    enderecosMockModel.create.mockReturnValue(endereco);

    const enderecoInput = endereco;

    delete enderecoInput.id;
    delete enderecoInput.updatedAt;
    delete enderecoInput.createdAt;

    const enderecoRetornado = await enderecosService.criar(enderecoInput);

    expect(enderecoRetornado.status).toEqual(200);
    expect(enderecoRetornado.endereco).toEqual(endereco);
  });
});
