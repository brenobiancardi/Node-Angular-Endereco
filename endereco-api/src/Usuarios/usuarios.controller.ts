import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { UsuariosService } from './usuarios.service';

import { IUsuarioDTO } from './Usuario/usuario.interface';
import { IUsuarioRespostas } from './../common/respostas/usuarioRespostas.interface';
@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Post()
  async criar(@Body() criarUsuario: IUsuarioDTO): Promise<IUsuarioRespostas> {
    return this.usuariosService.criar(criarUsuario);
  }

  @Post('login')
  async realizarLogin(@Body() { login, senha }): Promise<IUsuarioRespostas> {
    return this.usuariosService.realizarLogin(login, senha);
  }

  @Put()
  async alterar(@Body() usuario: IUsuarioDTO): Promise<IUsuarioRespostas> {
    const id = usuario.id;
    delete usuario.id;
    return this.usuariosService.alterar(id, usuario);
  }

  @Get()
  async listar(@Query('login') login: string): Promise<IUsuarioRespostas> {
    if (login) {
      return this.usuariosService.obterPorLogin(login);
    }
    return this.usuariosService.obterTodos();
  }

  @Delete()
  async delete(@Query('login') login: string): Promise<IUsuarioRespostas> {
    return this.usuariosService.deletar(login);
  }
}
