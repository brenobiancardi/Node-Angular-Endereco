import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Endereco } from './endereco.entity';
import { EnderecoDTO } from './Endereco/endereco.interface';
import { IEnderecoRespostas } from './../common/respostas/enderecoRespostas.interface';
@Injectable()
export class EnderecosService {
  constructor(@InjectModel(Endereco) private enderecoModel: typeof Endereco) {}

  async criar(endereco: EnderecoDTO): Promise<IEnderecoRespostas> {
    let mensagem = `Erro na criação do logradouro: ${endereco.logradouro}`;
    let codigoHTTP = HttpStatus.BAD_REQUEST;
    if (endereco) {
      let enderecoCriado: Endereco;
      try {
        enderecoCriado = await this.enderecoModel.create(endereco);
      } catch (e) {
        if (
          ((e.errors[0].path = 'logradouro'),
          (e.errors[0].validatorKey = 'not_unique'))
        )
          throw new HttpException(
            {
              status: codigoHTTP,
              error: `Logradouro: ${
                endereco.tpLogr + ' ' + endereco.logradouro
              } ja se encontra criado`,
            },
            codigoHTTP,
          );
      }
      if (enderecoCriado) {
        return {
          status: HttpStatus.OK,
          mensagem: `Usuario com login ${enderecoCriado.logradouro} criado com sucesso`,
          endereco: enderecoCriado,
        };
      }
    }
    throw new HttpException(
      {
        status: codigoHTTP,
        error: mensagem,
      },
      codigoHTTP,
    );
  }

  async alterar(
    id: string,
    endereco: EnderecoDTO,
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
          ((e.errors[0].path = 'logradouro'),
          (e.errors[0].validatorKey = 'not_unique'))
        )
          throw new HttpException(
            {
              status: codigoHTTP,
              error: `Logradouro: ${endereco.logradouro} ja cadastrado`,
            },
            codigoHTTP,
          );
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
        codigoHTTP = HttpStatus.NOT_FOUND;
        mensagem = `Logradouro não encontrado`;
      }
    }
    throw new HttpException(
      {
        status: codigoHTTP,
        error: mensagem,
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
          status: HttpStatus.NOT_FOUND,
          error: `Nenhum logradouro encontrado`,
        },
        HttpStatus.NOT_FOUND,
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
          status: HttpStatus.NOT_FOUND,
          error: `Logradouro não encontrado`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deletar(id: string): Promise<IEnderecoRespostas> {
    let mensagem = `Erro na exclusao do logradouro de ${id}`;
    let codigoHTTP = HttpStatus.BAD_REQUEST;
    const numExcluidos = await this.enderecoModel.destroy({ where: { id } });
    if (numExcluidos === 1) {
      return {
        status: HttpStatus.OK,
        mensagem: `Logradouro ${id} excluido com sucesso`,
      };
    } else if (numExcluidos === 0) {
      codigoHTTP = HttpStatus.NOT_FOUND;
      mensagem = `Logradouro não encontrado`;
    }
    throw new HttpException(
      {
        status: codigoHTTP,
        error: mensagem,
      },
      codigoHTTP,
    );
  }
}
