import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { IEnderecoDTO } from './Endereco/endereco.interface';

import { IEnderecoRespostas } from './../common/respostas/enderecoRespostas.interface';

import { JwtAuthGuard } from './../auth/jwt-auth.guard';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  CriarEnderecoAPI,
  EditarEnderecoAPI,
} from './Endereco/enderecoApi.interface';

@ApiBearerAuth()
@ApiTags('Enderecos')
@Controller('api/endereco')
export class EnderecosController {
  constructor(private enderecosService: EnderecosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async criar(@Body() endereco: CriarEnderecoAPI): Promise<IEnderecoRespostas> {
    return this.enderecosService.criar(endereco);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async listarPorId(@Param('id') id: string): Promise<IEnderecoRespostas> {
    return this.enderecosService.obterPorId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listarTodos(): Promise<IEnderecoRespostas> {
    return this.enderecosService.obterTodos();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async alterar(
    @Body() endereco: EditarEnderecoAPI,
  ): Promise<IEnderecoRespostas> {
    console.log(endereco);
    const id = String(endereco.id);
    delete endereco.id;
    return this.enderecosService.alterar(id, endereco);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletar(@Param('id') id: string): Promise<IEnderecoRespostas> {
    return this.enderecosService.deletar(id);
  }
}
