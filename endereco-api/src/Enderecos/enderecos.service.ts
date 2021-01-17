import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Endereco } from './endereco.entity';
import { IEnderecoDTO } from './Endereco/endereco.interface';
import { IEnderecoRespostas } from './../common/respostas/enderecoRespostas.interface';
@Injectable()
export class EnderecosService {
  constructor(@InjectModel(Endereco) private enderecoModel: typeof Endereco) {}

  async criar(endereco: IEnderecoDTO): Promise<IEnderecoRespostas> {
    let mensagem = `Erro na criação do logradouro: ${endereco.logradouro}`;
    let codigoHTTP = HttpStatus.BAD_REQUEST;
    if (endereco) {
      let enderecoCriado: Endereco;
      try {
        enderecoCriado = await this.enderecoModel.create(endereco);
      } catch (e) {
        if (
          (e.errors[0].path = 'logradouro') &&
          (e.errors[0].validatorKey = 'not_unique')
        ) {
          mensagem = `Logradouro: ${
            endereco.tpLogr + ' ' + endereco.logradouro
          } ja se encontra criado`;
        }
      }
      if (enderecoCriado) {
        return {
          status: HttpStatus.CREATED,
          mensagem: `Usuario com login ${enderecoCriado.logradouro} criado com sucesso`,
          endereco: enderecoCriado,
        };
      }
    }
    throw new HttpException(
      {
        status: codigoHTTP,
        mensagem: mensagem,
      },
      codigoHTTP,
    );
  }

  async obterTodos(): Promise<IEnderecoRespostas> {
    const enderecosEncontrados = await this.enderecoModel.findAll<Endereco>();
    if (enderecosEncontrados && enderecosEncontrados.length > 0) {
      return {
        status: HttpStatus.OK,
        mensagem: `${enderecosEncontrados.length} logradouros encontrados`,
        endereco: enderecosEncontrados,
      };
    } else if (!enderecosEncontrados || enderecosEncontrados.length === 0) {
      throw new HttpException(
        {
          status: HttpStatus.NO_CONTENT,
          mensagem: `Nenhum logradouro encontrado`,
        },
        HttpStatus.NO_CONTENT,
      );
    }
  }

  async obterPorId(id: string): Promise<IEnderecoRespostas> {
    const enderecoEncontrado = await this.enderecoModel.findOne<Endereco>({
      where: {
        id,
      },
    });

    if (enderecoEncontrado) {
      return {
        status: HttpStatus.OK,
        mensagem: `Logradouro: ${enderecoEncontrado.logradouro} encontrado`,
        endereco: enderecoEncontrado,
      };
    } else if (!enderecoEncontrado) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          mensagem: `Logradouro não encontrado`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async alterar(
    id: string,
    endereco: IEnderecoDTO,
  ): Promise<IEnderecoRespostas> {
    let mensagem = `Erro na alteração do logradouro ${endereco.logradouro}`;
    let codigoHTTP = HttpStatus.BAD_REQUEST;
    if (id) {
      let numAlterados = 0;
      try {
        [numAlterados] = await this.enderecoModel.update(endereco, {
          where: { id },
        });
      } catch (e) {
        if (
          (e.errors[0].path = 'logradouro') &&
          (e.errors[0].validatorKey = 'not_unique')
        ) {
          mensagem = `Logradouro: ${endereco.logradouro} ja cadastrado`;
        }
      }
      if (numAlterados === 1) {
        const enderecoAlterado = await this.enderecoModel.findOne({
          where: {
            id,
          },
        });
        return {
          status: HttpStatus.OK,
          mensagem: `Logradouro ${enderecoAlterado.logradouro} alterado com sucesso`,
          endereco: enderecoAlterado,
        };
      } else if (numAlterados === 0) {
        mensagem = `Logradouro não encontrado`;
      }
    }
    throw new HttpException(
      {
        status: codigoHTTP,
        mensagem: mensagem,
      },
      codigoHTTP,
    );
  }

  async deletar(id: string): Promise<IEnderecoRespostas> {
    let mensagem = `Erro na exclusao do logradouro de ${id}`;
    let codigoHTTP = HttpStatus.BAD_REQUEST;
    const numExcluidos = await this.enderecoModel.destroy({ where: { id } });
    if (numExcluidos === 1) {
      return {
        status: HttpStatus.OK,
        mensagem: 'Logradouro excluido com sucesso',
      };
    } else if (numExcluidos === 0) {
      codigoHTTP = HttpStatus.BAD_REQUEST;
      mensagem = 'Logradouro não encontrado';
    }
    throw new HttpException(
      {
        status: codigoHTTP,
        mensagem: mensagem,
      },
      codigoHTTP,
    );
  }
}
