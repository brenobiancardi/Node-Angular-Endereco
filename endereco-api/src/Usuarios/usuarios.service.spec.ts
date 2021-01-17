import { HttpException, HttpStatus } from '@nestjs/common';

import { Test, TestingModule } from '@nestjs/testing';

import { getModelToken } from '@nestjs/sequelize';

import TestUtil from '../common/testes/TestUtil';

import { Usuario } from './usuario.entity';

import { UsuariosService } from './usuarios.service';

import { UniqueConstraintError, ValidationErrorItem } from 'sequelize';

describe('UsuariosService', () => {
  let usuariosService: UsuariosService;

  const usuariosMockModel = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
    update: jest.fn(),
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

  it('Deve retornar erro na criacao de usuario', async () => {
    const usuario = TestUtil.fornecaMeUsuariosValidos(1);

    usuariosMockModel.create.mockRejectedValue(
      new UniqueConstraintError({
        errors: [new ValidationErrorItem('message', 'login', 'not_unique')],
      }),
    );

    delete usuario.id;
    delete usuario.updatedAt;
    delete usuario.createdAt;

    await expect(usuariosService.criar(usuario)).rejects.toThrow(
      new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          mensagem: `Login: ${usuario.login} ja se encontra em uso`,
        },
        HttpStatus.BAD_REQUEST,
      ),
    );
  });

  it('Deve listar todos os usuarios', async () => {
    const usuario = TestUtil.fornecaMeUmUsuarioRespostaValido(2);

    usuariosMockModel.findAll.mockReturnValue([usuario, usuario]);

    const usuarioRetornado = await usuariosService.obter();

    expect(usuarioRetornado.status).toEqual(200);
    expect(usuarioRetornado.usuario).toHaveLength(2);
    expect(usuarioRetornado.mensagem).toEqual(`2 Usuarios encontrados`);
  });

  it('Deve listar o usuario filtrado', async () => {
    const usuario = TestUtil.fornecaMeUmUsuarioRespostaValido(1);
    const usuarioDBMock = TestUtil.fornecaMeUsuariosValidos(1);

    usuariosMockModel.findAll.mockReturnValue([usuarioDBMock]);

    const usuarioRetornado = await usuariosService.obter(usuarioDBMock.login);

    expect(usuarioRetornado.status).toEqual(200);
    expect(usuarioRetornado.mensagem).toEqual(
      `Usuario ${usuarioDBMock.login} encontrado`,
    );
  });

  it('Deve retornar erro na listagem', async () => {
    usuariosMockModel.findAll.mockReturnValue([]);

    await expect(usuariosService.obter()).rejects.toThrow(
      new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          mensagem: 'Nenhum usuario encontrado com as condições estabelecidas',
        },
        HttpStatus.BAD_REQUEST,
      ),
    );
  });

  it('Deve alterar um usuario', async () => {
    let usuario = TestUtil.fornecaMeUsuariosValidos(1);
    let usuarioModificado = usuario;

    usuarioModificado.updatedAt = new Date();

    delete usuario.createdAt;
    delete usuario.updatedAt;

    usuarioModificado.nome = usuario.nome + 'modificado';

    usuariosMockModel.update.mockReturnValue([1]);

    usuariosMockModel.findOne.mockReturnValue(usuarioModificado);

    const usuarioRetornado = await usuariosService.alterar(usuario.id, usuario);

    expect(usuarioRetornado.status).toEqual(200);
    expect(usuarioRetornado).toHaveProperty('usuario');
  });

  it('Deve avisar ao nao alterar nenhum usuario', async () => {
    let usuario = TestUtil.fornecaMeUsuariosValidos(1);
    let usuarioModificado = usuario;

    delete usuario.createdAt;
    delete usuario.updatedAt;

    usuarioModificado.nome = usuario.nome + 'modificado';

    usuariosMockModel.update.mockReturnValue([0]);

    await expect(usuariosService.alterar(usuario.id, usuario)).rejects.toThrow(
      new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          mensagem: `Usuario ${usuario.login} não encontrado`,
        },
        HttpStatus.BAD_REQUEST,
      ),
    );
  });

  it('Deve retornar erro na alteracao de usuario', async () => {
    let usuario = TestUtil.fornecaMeUsuariosValidos(1);

    delete usuario.createdAt;
    delete usuario.updatedAt;

    usuariosMockModel.update.mockRejectedValue(
      new UniqueConstraintError({
        errors: [new ValidationErrorItem('message', 'login', 'not_unique')],
      }),
    );

    await expect(usuariosService.alterar(usuario.id, usuario)).rejects.toThrow(
      new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          mensagem: `Login: ${usuario.login} ja se encontra em uso`,
        },
        HttpStatus.BAD_REQUEST,
      ),
    );
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

  it('Deve retornar erro na exclusao de usuario inexistente', async () => {
    const usuario = TestUtil.fornecaMeUsuariosValidos(1);

    usuariosMockModel.destroy.mockReturnValue(0);

    const login = usuario.login;

    await expect(usuariosService.deletar(login)).rejects.toThrow(
      new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          mensagem: `Usuario ${login} não encontrado`,
        },
        HttpStatus.BAD_REQUEST,
      ),
    );
  });

  it('Deve retornar um usuario para o sistema de autenticacao', async () => {
    const usuario = TestUtil.fornecaMeUsuariosValidos(1);

    usuariosMockModel.findOne.mockReturnValue(usuario);

    const usuarioRetornado = await usuariosService.encontrarUsuario(
      usuario.login,
    );

    expect(usuarioRetornado).toEqual(usuario);
  });
});
