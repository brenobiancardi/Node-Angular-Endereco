import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Usuario } from './usuario.entity';
import { IUsuarioDTO } from './Usuario/usuario.interface';

import { IUsuarioRespostas } from './../common/respostas/usuarioRespostas.interface';
@Injectable()
export class UsuariosService {
  constructor(@InjectModel(Usuario) private usuarioModel: typeof Usuario) {}

  async obterTodos(): Promise<IUsuarioRespostas> {
    const usuariosEncontrados = await this.usuarioModel.findAll<Usuario>();
    if (usuariosEncontrados && usuariosEncontrados.length > 0) {
      return {
        status: HttpStatus.OK,
        mensagem: `${usuariosEncontrados.length} Usuarios encontrados`,
        usuario: usuariosEncontrados,
      };
    } else if (!usuariosEncontrados || usuariosEncontrados.length === 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Nenhum Usuario encontrado`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async obterPorLogin(login: string): Promise<IUsuarioRespostas> {
    const usuarioEncontrado = await this.usuarioModel.findOne<Usuario>({
      where: {
        login,
      },
    });
    if (usuarioEncontrado) {
      return {
        status: HttpStatus.OK,
        mensagem: `Usuario ${login} encontrado`,
        usuario: usuarioEncontrado,
      };
    } else if (!usuarioEncontrado) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Usuario ${login} não encontrado`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async criar(usuario: IUsuarioDTO): Promise<IUsuarioRespostas> {
    let mensagem = `Erro na criação do usuario ${usuario.login}`;
    let codigoHTTP = HttpStatus.BAD_REQUEST;
    if (usuario) {
      let usuarioCriado: Usuario;
      try {
        usuarioCriado = await this.usuarioModel.create<Usuario>(usuario);
      } catch (e) {
        if (
          ((e.errors[0].path = 'login'),
          (e.errors[0].validatorKey = 'not_unique'))
        )
          throw new HttpException(
            {
              status: codigoHTTP,
              error: `Login: ${usuario.login} ja se encontra em uso`,
            },
            codigoHTTP,
          );
      }
      if (usuarioCriado) {
        return {
          status: HttpStatus.OK,
          mensagem: `Usuario com login ${usuarioCriado.login} criado com sucesso`,
          usuario: usuarioCriado,
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

  async alterar(id: number, usuario: IUsuarioDTO): Promise<IUsuarioRespostas> {
    let mensagem = `Erro na alteração do usuario ${usuario.login}`;
    let codigoHTTP = HttpStatus.BAD_REQUEST;
    if (id) {
      let numAlterados = 0;
      try {
        [numAlterados] = await this.usuarioModel.update(usuario, {
          where: { id },
        });
      } catch (e) {
        if (
          ((e.errors[0].path = 'login'),
          (e.errors[0].validatorKey = 'not_unique'))
        )
          throw new HttpException(
            {
              status: codigoHTTP,
              error: `Login: ${usuario.login} ja se encontra em uso`,
            },
            codigoHTTP,
          );
      }
      if (numAlterados === 1) {
        const usuarioAlterado = await this.usuarioModel.findOne({
          where: {
            id,
          },
        });
        return {
          status: HttpStatus.OK,
          mensagem: `Usuario ${usuarioAlterado.nome} alterado com sucesso`,
          usuario: usuarioAlterado,
        };
      } else if (numAlterados === 0) {
        codigoHTTP = HttpStatus.NOT_FOUND;
        mensagem = `Usuario ${usuario.login} não encontrado`;
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

  async realizarLogin(
    login: string,
    senha: string,
  ): Promise<IUsuarioRespostas> {
    const usuario = await this.usuarioModel.findOne({
      where: { login, senha },
    });

    if (usuario) {
      delete usuario.senha;
      return {
        status: HttpStatus.OK,
        mensagem: `Login realizado com sucesso`,
        usuario: usuario,
      };
    } else if (!usuario) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: `Usuario ou senha invalido`,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async deletar(login: string): Promise<IUsuarioRespostas> {
    let mensagem = `Erro na exclusao do usuario ${login}`;
    let codigoHTTP = HttpStatus.BAD_REQUEST;
    if (login) {
      const numExcluidos = await this.usuarioModel.destroy({
        where: { login },
      });
      if (numExcluidos === 1) {
        return {
          status: HttpStatus.OK,
          mensagem: `Usuario ${login} excluido com sucesso`,
        };
      } else if (numExcluidos === 0) {
        codigoHTTP = HttpStatus.NOT_FOUND;
        mensagem = `Usuario ${login} não encontrado`;
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
}
