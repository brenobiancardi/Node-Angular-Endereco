import { UsuariosService } from './usuarios.service';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { UsuariosController } from './usuarios.controller';
import * as request from 'supertest';
import TestUtil from 'src/common/test/TestUtil';

describe('UsuariosController', () => {
  let controller: UsuariosController;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      imports: [AppModule, UsuariosService],
    }).compile();

    controller = module.get<UsuariosController>(UsuariosController);
    app = module.createNestApplication();
    await app.init();
  });

  it('Deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('/ (GET)', () => {
    const usuario = TestUtil.fornecaMeUmUsuarioValido();

    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect([usuario, usuario]);
  });
});
