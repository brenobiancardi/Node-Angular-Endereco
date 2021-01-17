import { ApiProperty } from '@nestjs/swagger';
import { IEnderecoDTO } from './endereco.interface';

export class CriarEnderecoAPI implements IEnderecoDTO {
  @ApiProperty()
  tpLogr: string;

  @ApiProperty()
  logradouro: string;

  @ApiProperty()
  bairro: string;

  @ApiProperty()
  cidade: string;

  @ApiProperty()
  uf: string;
}

export class EditarEnderecoAPI {
  @ApiProperty()
  id: number;

  @ApiProperty()
  tpLogr?: string;

  @ApiProperty()
  logradouro?: string;

  @ApiProperty()
  bairro?: string;

  @ApiProperty()
  cidade?: string;

  @ApiProperty()
  uf?: string;
}
