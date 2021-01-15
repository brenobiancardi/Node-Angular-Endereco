import { Test, TestingModule } from '@nestjs/testing';
import TestUtil from '../common/testes/TestUtil';

import { getModelToken } from '@nestjs/sequelize';

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
    const usuario = TestUtil.fornecaMeUmUsuarioRespostaValido(2);

    usuariosMockModel.findAll.mockReturnValue([usuario, usuario]);

    const usuarioRetornado = await usuariosService.obterTodos();

    expect(usuarioRetornado.status).toEqual(200);
    expect(usuarioRetornado.usuario).toHaveLength(2);
  });

  it('Deve listar o usuario filtrado', async () => {
    const usuario = TestUtil.fornecaMeUsuariosValidos(1);

    usuariosMockModel.findOne.mockReturnValue(usuario);
    let login = '';
    if (usuario.login) {
      login = usuario.login;
    } else {
      login = usuario[0].login;
    }

    const usuarioRetornado = await usuariosService.obterPorLogin(login);

    expect(usuarioRetornado.status).toEqual(200);
    expect(usuarioRetornado.usuario).toEqual(usuario);
  });

  it('Deve criar um usuario', async () => {
    const usuario = TestUtil.fornecaMeUsuariosValidos(1);

    usuariosMockModel.create.mockReturnValue(usuario);

    const usuarioTeste = usuario;
    delete usuarioTeste.id;
    delete usuarioTeste.updatedAt;
    delete usuarioTeste.createdAt;

    const usuarioRetornado = await usuariosService.criar(usuario);

    expect(usuarioRetornado.status).toEqual(200);
    expect(usuarioRetornado.usuario).toEqual(usuario);
  });

  it('Deve excluir um usuario', async () => {
    const usuario = TestUtil.fornecaMeUsuariosValidos(1);

    usuariosMockModel.destroy.mockReturnValue(1);

    const resposta = await usuariosService.deletar(usuario.login);

    expect(resposta.status).toEqual(200);
    expect(resposta.mensagem).toEqual(
      `Usuario ${usuario.login} excluido com sucesso`,
    );
  });
});
