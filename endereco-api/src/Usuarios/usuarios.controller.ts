import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsuarioDTO } from './Usuario/usuario.interface';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Post('create')
  async criar(@Body() criarUsuario: UsuarioDTO): Promise<UsuarioDTO> {
    return this.usuariosService.criar(criarUsuario);
  }

  @Get()
  async listar(@Query('login') login: string): Promise<UsuarioDTO[]> {
    if (login) {
      return this.usuariosService.obterPorLogin(login);
    }
    return this.usuariosService.obterTodos();
  }
}
