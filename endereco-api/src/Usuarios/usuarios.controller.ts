import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { UsuariosService } from './usuarios.service';

import { IUsuarioDTO } from './Usuario/usuario.interface';
import { IUsuarioRespostas } from './../common/respostas/usuarioRespostas.interface';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async criar(@Body() criarUsuario: IUsuarioDTO): Promise<IUsuarioRespostas> {
    return this.usuariosService.criar(criarUsuario);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async alterar(@Body() usuario: IUsuarioDTO): Promise<IUsuarioRespostas> {
    const id = usuario.id;
    delete usuario.id;
    return this.usuariosService.alterar(id, usuario);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listar(@Query('login') login: string): Promise<IUsuarioRespostas> {
    return this.usuariosService.obter(login);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Query('login') login: string): Promise<IUsuarioRespostas> {
    return this.usuariosService.deletar(login);
  }
}
