import { Endereco } from './endereco.entity';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { EnderecosService } from './enderecos.service';
import TestUtil from '../common/test/TestUtil';

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
    const endereco = TestUtil.fornecaMeUmEnderecoValido();

    enderecosMockModel.findAll.mockReturnValue([endereco, endereco]);

    const enderecoRetornado = await enderecosService.obterTodos();

    expect(enderecoRetornado).toHaveLength(2);
    expect(enderecoRetornado).toEqual([endereco, endereco]);
  });

  it('Deve listar o usuario filtrado', async () => {
    const endereco = TestUtil.fornecaMeUmEnderecoValido();

    enderecosMockModel.findAll.mockReturnValue([endereco]);

    const usuarioRetornado = await enderecosService.obterPorId('1');

    expect(usuarioRetornado).toHaveLength(1);
    expect(usuarioRetornado).toEqual([endereco]);
  });

  it('Criar um usuario', async () => {
    const endereco = TestUtil.fornecaMeUmEnderecoValido();

    enderecosMockModel.create.mockReturnValue([endereco]);

    delete endereco.id;
    delete endereco.updatedAt;
    delete endereco.createdAt;

    const usuarioRetornado = await enderecosService.criar(endereco);

    expect(usuarioRetornado).toHaveLength(1);
    expect(usuarioRetornado).toEqual([endereco]);
  });
});
