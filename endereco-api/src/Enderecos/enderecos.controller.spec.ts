import { EnderecosService } from './enderecos.service';
import { Test, TestingModule } from '@nestjs/testing';
import { EnderecosController } from './enderecos.controller';

describe('EnderecosController', () => {
  let controller: EnderecosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnderecosController],
      imports: [EnderecosService],
    }).compile();

    controller = module.get<EnderecosController>(EnderecosController);
  });

  it('Deve estar definido', () => {
    expect(controller).toBeDefined();
  });
});
