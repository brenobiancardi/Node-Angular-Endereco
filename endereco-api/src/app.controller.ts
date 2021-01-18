import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

import { ILoginRespostas } from './common/respostas/loginRespostas.interface';

import { ApiBody, ApiTags } from '@nestjs/swagger';
import { loginAPI } from './Usuarios/Usuario/usuarioApi.interface';

@ApiTags('Login')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('usuarios/login')
  @ApiBody({ type: loginAPI })
  async realizarLogin(@Body() { login, senha }): Promise<ILoginRespostas> {
    console.log(login, senha);
    return this.appService.realizarLogin(login, senha);
  }
}
