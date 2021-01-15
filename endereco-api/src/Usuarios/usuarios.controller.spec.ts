import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';

import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';

import TestUtil from '../common/testes/TestUtil';

describe('usuariosController', () => {
  let usuariosController: UsuariosController;

  const usuariosMockModel = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
  };

  beforeEach(async () => {
    const moduleUsuarios = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [
        UsuariosService,
        {
          provide: getModelToken(Usuario),
          useValue: usuariosMockModel,
        },
      ],
    }).compile();

    usuariosController = moduleUsuarios.get<UsuariosController>(
      UsuariosController,
    );
  });

  it('Deve estar definido', () => {
    expect(usuariosController).toBeDefined();
  });
});
