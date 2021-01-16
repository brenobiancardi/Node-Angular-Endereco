import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

import { ILoginRespostas } from './common/respostas/loginRespostas.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStatus(): string {
    return this.appService.getStatus();
  }

  @Post('usuarios/login')
  async realizarLogin(@Body() { login, senha }): Promise<ILoginRespostas> {
    return this.appService.realizarLogin(login, senha);
  }
}
