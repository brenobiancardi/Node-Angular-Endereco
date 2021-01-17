import { InjectModel } from '@nestjs/sequelize';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Usuario } from './usuario.entity';
import { IUsuarioDTO } from './Usuario/usuario.interface';

import { IUsuarioRespostas } from './../common/respostas/usuarioRespostas.interface';

import { EditarUsuarioAPI } from './Usuario/usuarioApi.interface';
@Injectable()
export class UsuariosService {
  constructor(@InjectModel(Usuario) private usuarioModel: typeof Usuario) {}

  async criar(usuario: IUsuarioDTO): Promise<IUsuarioRespostas> {
    let mensagem = `Erro na criação do usuario ${usuario.login}`;
    let codigoHTTP = HttpStatus.BAD_REQUEST;
    if (usuario) {
      let usuarioCriado: Usuario;
      try {
        usuarioCriado = await this.usuarioModel.create<Usuario>(usuario);
      } catch (e) {
        if (
          (e.errors[0].path = 'login') &&
          (e.errors[0].validatorKey = 'not_unique')
        ) {
          mensagem = `Login: ${usuario.login} ja se encontra em uso`;
        }
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
        mensagem: mensagem,
      },
      codigoHTTP,
    );
  }

  async obter(login?: string): Promise<IUsuarioRespostas> {
    let usuarioEncontrado;
    if (login) {
      usuarioEncontrado = await this.usuarioModel.findAll<Usuario>({
        where: {
          login,
        },
      });
    } else {
      usuarioEncontrado = await this.usuarioModel.findAll<Usuario>();
    }
    if (usuarioEncontrado && usuarioEncontrado.length > 1) {
      return {
        status: HttpStatus.OK,
        mensagem: `${usuarioEncontrado.length} Usuarios encontrados`,
        usuario: usuarioEncontrado,
      };
    } else if (usuarioEncontrado && usuarioEncontrado.length === 1) {
      return {
        status: HttpStatus.OK,
        mensagem: `Usuario ${login} encontrado`,
        usuario: usuarioEncontrado,
      };
    }
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        mensagem: 'Nenhum usuario encontrado com as condições estabelecidas',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  async alterar(
    id: number,
    usuario: EditarUsuarioAPI,
  ): Promise<IUsuarioRespostas> {
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
              mensagem: `Login: ${usuario.login} ja se encontra em uso`,
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
        codigoHTTP = HttpStatus.BAD_REQUEST;
        mensagem = `Usuario ${usuario.login} não encontrado`;
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
        mensagem = `Usuario ${login} não encontrado`;
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

  async encontrarUsuario(login: string): Promise<IUsuarioDTO> {
    const usuarioEncontrado = await this.usuarioModel.findOne({
      where: { login },
    });
    return usuarioEncontrado;
  }
}
