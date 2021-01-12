import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Usuario } from './usuario.entity';
import { UsuarioDTO } from './Usuario/usuario.interface';

@Injectable()
export class UsuariosService {
  constructor(@InjectModel(Usuario) private usuarioModel: typeof Usuario) {}

  async obterTodos(): Promise<Usuario[]> {
    return this.usuarioModel.findAll<Usuario>();
  }

  async obterPorLogin(login: string): Promise<Usuario[]> {
    return this.usuarioModel.findAll<Usuario>({
      where: {
        login,
      },
    });
  }

  async criar(usuario: UsuarioDTO): Promise<Usuario> {
    const usuarioCriado = await this.usuarioModel.create(usuario);
    return usuarioCriado;
  }

  async deletar(login: string): Promise<number> {
    return this.usuarioModel.destroy({ where: { login } });
  }
}
