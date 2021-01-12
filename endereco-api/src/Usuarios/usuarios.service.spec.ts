import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import TestUtil from '../common/test/TestUtil';
import { Usuario } from './usuario.entity';

import { UsuariosService } from './usuarios.service';

describe('UsuariosService', () => {
  let usuariosService: UsuariosService;

  const usuariosMockModel = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        {
          provide: getModelToken(Usuario),
          useValue: usuariosMockModel,
        },
      ],
    }).compile();

    usuariosService = module.get<UsuariosService>(UsuariosService);
  });

  it('Serviço deve estar definido', () => {
    expect(usuariosService).toBeDefined();
  });

  it('Deve listar todos os usuarios', async () => {
    const usuario = TestUtil.fornecaMeUmUsuarioValido();

    usuariosMockModel.findAll.mockReturnValue([usuario, usuario]);

    const usuarioRetornado = await usuariosService.obterTodos();

    expect(usuarioRetornado).toHaveLength(2);
    expect(usuarioRetornado).toEqual([usuario, usuario]);
  });

  it('Deve listar o usuario filtrado', async () => {
    const usuario = TestUtil.fornecaMeUmUsuarioValido();

    usuariosMockModel.findAll.mockReturnValue([usuario]);

    const usuarioRetornado = await usuariosService.obterPorLogin('breno');

    expect(usuarioRetornado).toHaveLength(1);
    expect(usuarioRetornado).toEqual([usuario]);
  });

  it('Deve criar um usuario', async () => {
    const usuario = TestUtil.fornecaMeUmUsuarioValido();

    usuariosMockModel.create.mockReturnValue([usuario]);

    delete usuario.id;
    delete usuario.updatedAt;
    delete usuario.createdAt;

    const usuarioRetornado = await usuariosService.criar(usuario);

    expect(usuarioRetornado).toHaveLength(1);
    expect(usuarioRetornado).toEqual([usuario]);
  });

  it('Deve excluir um usuario', async () => {
    const usuario = TestUtil.fornecaMeUmUsuarioValido();

    usuariosMockModel.destroy.mockReturnValue([1]);

    const numExcluidos = await usuariosService.deletar(String(usuario.id));

    expect(numExcluidos).toEqual([1]);
  });
});
