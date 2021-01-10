import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { EnderecoDTO } from './Endereco/endereco.interface';

@Controller('api/endereco')
export class EnderecosController {
  constructor(private enderecosService: EnderecosService) {}

  @Post('create')
  async criar(@Body() criarUsuario: EnderecoDTO): Promise<EnderecoDTO> {
    return this.enderecosService.criar(criarUsuario);
  }

  @Get(':id')
  async listarPorId(@Param('id') id: string): Promise<EnderecoDTO> {
    return this.enderecosService.obterPorId(id);
  }
  @Get()
  async listarTodos(): Promise<EnderecoDTO[]> {
    return this.enderecosService.obterTodos();
  }
}
