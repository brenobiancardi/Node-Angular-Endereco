import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { IEnderecoDTO } from './Endereco/endereco.interface';
import { IEnderecoRespostas } from './../common/respostas/enderecoRespostas.interface';

@Controller('api/endereco')
export class EnderecosController {
  constructor(private enderecosService: EnderecosService) {}

  @Get(':id')
  async listarPorId(@Param('id') id: string): Promise<IEnderecoRespostas> {
    return this.enderecosService.obterPorId(id);
  }

  @Get()
  async listarTodos(): Promise<IEnderecoRespostas> {
    return this.enderecosService.obterTodos();
  }

  @Put()
  async alterar(@Body() endereco: IEnderecoDTO): Promise<IEnderecoRespostas> {
    const id = String(endereco.id);
    delete endereco.id;
    return this.enderecosService.alterar(id, endereco);
  }

  @Post()
  async criar(@Body() endereco: IEnderecoDTO): Promise<IEnderecoRespostas> {
    return this.enderecosService.criar(endereco);
  }

  @Delete(':id')
  async deletar(@Param('id') id: string): Promise<IEnderecoRespostas> {
    return this.enderecosService.deletar(id);
  }
}
