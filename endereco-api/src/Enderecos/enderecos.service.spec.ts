import { Endereco } from './endereco.entity';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { EnderecosService } from './enderecos.service';
import TestUtil from '../common/testes/TestUtil';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UniqueConstraintError } from 'sequelize';

import { ValidationErrorItem } from 'sequelize';

describe('EnderecosService', () => {
  let enderecosService: EnderecosService;

  const enderecosMockModel = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
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

  it('Deve criar um endereco', async () => {
    const endereco = TestUtil.fornecaMeEnderecosValidos(1);

    enderecosMockModel.create.mockReturnValue(endereco);

    const enderecoInput = endereco;

    delete enderecoInput.id;
    delete enderecoInput.updatedAt;
    delete enderecoInput.createdAt;

    const enderecoRetornado = await enderecosService.criar(enderecoInput);

    expect(enderecoRetornado.status).toEqual(201);
    expect(enderecoRetornado.endereco).toEqual(endereco);
  });

  it('Deve retornar erro na criacao de endereco', async () => {
    const enderecoInput = TestUtil.fornecaMeEnderecosValidos(1);

    enderecosMockModel.create.mockRejectedValue(
      new UniqueConstraintError({
        errors: [
          new ValidationErrorItem('message', 'logradouro', 'not_unique'),
        ],
      }),
    );

    delete enderecoInput.id;
    delete enderecoInput.updatedAt;
    delete enderecoInput.createdAt;

    await expect(enderecosService.criar(enderecoInput)).rejects.toThrow(
      new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          mensagem: `Logradouro: ${
            enderecoInput.tpLogr + ' ' + enderecoInput.logradouro
          } ja se encontra criado`,
        },
        HttpStatus.BAD_REQUEST,
      ),
    );
  });

  it('Deve listar todos os enderecos', async () => {
    const endereco = TestUtil.fornecaMeEnderecosValidos(2);

    enderecosMockModel.findAll.mockReturnValue(endereco);

    const enderecoRetornado = await enderecosService.obterTodos();

    expect(enderecoRetornado.status).toEqual(200);
    expect(enderecoRetornado.endereco).toHaveLength(2);
  });

  it('Deve retornar erro na listagem', async () => {
    enderecosMockModel.findAll.mockReturnValue([]);

    await expect(enderecosService.obterTodos()).rejects.toThrow(
      new HttpException(
        {
          status: HttpStatus.OK,
          mensagem: `Nenhum logradouro encontrado`,
        },
        HttpStatus.OK,
      ),
    );
  });

  it('Deve listar o endereco filtrado', async () => {
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
    expect(enderecoRetornado).toHaveProperty('endereco');
    expect(enderecoRetornado.endereco).toEqual(endereco);
  });

  it('Deve retornar bad request quando nao encontrar o endereco especificado', async () => {
    const endereco = TestUtil.fornecaMeEnderecosValidos(1);
    let id = 0;
    enderecosMockModel.findOne.mockReturnValue(undefined);

    if (endereco.id) {
      id = endereco.id;
    } else {
      id = endereco[0].id;
    }

    await expect(enderecosService.obterPorId(String(id))).rejects.toThrow(
      new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          mensagem: `Logradouro não encontrado`,
        },
        HttpStatus.BAD_REQUEST,
      ),
    );
  });

  it('Deve alterar um endereco', async () => {
    const endereco = TestUtil.fornecaMeEnderecosValidos(1);

    enderecosMockModel.update.mockReturnValue([1]);
    enderecosMockModel.findOne.mockReturnValue(endereco);
    const id = endereco.id;

    const enderecoRetornado = await enderecosService.alterar(
      String(id),
      endereco,
    );

    expect(enderecoRetornado.status).toEqual(200);
    expect(enderecoRetornado.endereco).toEqual(endereco);
  });

  it('Deve retornar erro na alteracao de endereco', async () => {
    const endereco = TestUtil.fornecaMeEnderecosValidos(1);
    const id = endereco.id;

    enderecosMockModel.update.mockRejectedValue(
      new UniqueConstraintError({
        errors: [
          new ValidationErrorItem('message', 'logradouro', 'not_unique'),
        ],
      }),
    );

    await expect(enderecosService.alterar(id, endereco)).rejects.toThrow(
      new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          mensagem: `Logradouro: ${
            endereco.tpLogr + ' ' + endereco.logradouro
          } ja se encontra criado`,
        },
        HttpStatus.BAD_REQUEST,
      ),
    );
  });

  it('Deve deletar um endereco', async () => {
    const endereco = TestUtil.fornecaMeEnderecosValidos(1);

    enderecosMockModel.destroy.mockReturnValue(1);
    const id = endereco.id;

    const enderecoRetornado = await enderecosService.deletar(String(id));

    expect(enderecoRetornado.status).toEqual(200);
    expect(enderecoRetornado.mensagem).toEqual(
      `Logradouro excluido com sucesso`,
    );
  });

  it('Deve retornar erro ao tentar deletar endereco inexistente', async () => {
    const endereco = TestUtil.fornecaMeEnderecosValidos(1);

    enderecosMockModel.destroy.mockReturnValue(0);
    const id = endereco.id;

    await expect(enderecosService.deletar(id)).rejects.toThrow(
      new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          mensagem: 'Logradouro não encontrado',
        },
        HttpStatus.BAD_REQUEST,
      ),
    );
  });
});
