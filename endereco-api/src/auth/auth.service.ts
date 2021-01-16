import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { UsuariosService } from './../Usuarios/usuarios.service';

import { IUsuarioDTO } from './../Usuarios/Usuario/usuario.interface';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async validarUsuario(
    login: string,
    senha: string,
  ): Promise<IUsuarioDTO | null> {
    const usuarioEncontrado = await this.usuariosService.encontrarUsuario(
      login,
    );

    if (usuarioEncontrado && usuarioEncontrado.senha === senha) {
      const { senha, ...usuario } = usuarioEncontrado;
      return usuario;
    }

    return null;
  }

  async login(usuario: IUsuarioDTO): Promise<string> {
    const payload = { username: usuario.login, sub: usuario.id };

    return this.jwtService.sign(payload);
  }
}
