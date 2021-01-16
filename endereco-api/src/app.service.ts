import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AuthService } from './auth/auth.service';

import { ILoginRespostas } from './common/respostas/loginRespostas.interface';
@Injectable()
export class AppService {
  constructor(private authService: AuthService) {}
  getStatus(): string {
    return 'Servidor Executando';
  }

  async realizarLogin(login: string, senha: string): Promise<ILoginRespostas> {
    const usuario = await this.authService.validarUsuario(login, senha);
    if (usuario) {
      const token = await this.authService.login(usuario);
      return {
        status: HttpStatus.OK,
        mensagem: `Login realizado com sucesso`,
        token: String(token),
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
}
