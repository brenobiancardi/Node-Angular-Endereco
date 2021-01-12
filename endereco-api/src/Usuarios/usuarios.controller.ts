import { Res } from '@nestjs/common';
import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { response } from 'express';
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

  @Delete()
  async delete(@Res() resposta, @Query('login') login: string): Promise<any> {
    const respostaMSG = {
      erro: true,
      mensagem: `Erro na exclusao do usuario possuidor do login: ${login} Não encontrado`,
    };
    let codigoHTTP = 400;

    if (login) {
      const numExcluidos = await this.usuariosService.deletar(login);
      if (numExcluidos === 1) {
        respostaMSG.erro = false;
        codigoHTTP = 200;
        respostaMSG.mensagem = `Usuario de login: ${login} excluido com sucesso`;
      } else if (numExcluidos === 0) {
        codigoHTTP = 404;
        respostaMSG.mensagem = `Usuario de login: ${login} não encontrado`;
      }
    }
    return resposta.status(codigoHTTP).json(respostaMSG);
  }
}
