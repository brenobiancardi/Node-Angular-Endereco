import { Test, TestingModule } from '@nestjs/testing';

import TestUtil from './../common/testes/TestUtil';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  const JwtServiceMock = { sign: jest.fn() };
  const UsuariosServiceMock = { encontrarUsuario: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'JwtService',
          useValue: JwtServiceMock,
        },
        {
          provide: 'UsuariosService',
          useValue: UsuariosServiceMock,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Deve estar definido', () => {
    expect(authService).toBeDefined();
  });

  it('Deve validar se nome de usuario existe e se senha confere', async () => {
    const usuario = TestUtil.fornecaMeUsuariosValidos(1);

    const { login, senha } = usuario;

    UsuariosServiceMock.encontrarUsuario.mockReturnValue(usuario);

    const usuarioRetornado = await authService.validarUsuario(login, senha);

    delete usuario.senha;

    expect(usuarioRetornado).toEqual(usuario);
    expect(usuarioRetornado).not.toHaveProperty('senha');
  });

  it('Deve retornar nulo se nome de usuario nao existe ou senha nao confere', async () => {
    const usuario = TestUtil.fornecaMeUsuariosValidos(1);

    const { login } = usuario;

    const senha = 'senhanaoconfere';

    UsuariosServiceMock.encontrarUsuario.mockReturnValue(usuario);

    const usuarioRetornado = await authService.validarUsuario(login, senha);

    delete usuario.senha;

    expect(usuarioRetornado).toEqual(null);
  });

  it('Deve retornar um token quando passado usuario e senha', async () => {
    const usuario = TestUtil.fornecaMeUsuariosValidos(1);

    const tokenJWT =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTA4MzI2NTEsImV4cCI6MTYxMzgzMjY1MX0.7OE-Q6sqri8hPs6KRJ96ELUP1sr6IJIYzd6lO7UmpHs';

    JwtServiceMock.sign.mockReturnValue(tokenJWT);

    const usuarioRetornado = await authService.login(usuario);

    expect(usuarioRetornado).toEqual(tokenJWT);
  });
});
