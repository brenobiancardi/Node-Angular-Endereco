import { ApiProperty } from '@nestjs/swagger';
import { IUsuarioDTO } from './usuario.interface';

export class CriarUsuarioAPI implements IUsuarioDTO {
  @ApiProperty()
  tipoUsuario: string;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  senha: string;
}

export class EditarUsuarioAPI {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  tipoUsuario?: string;

  @ApiProperty()
  nome?: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  senha?: string;
}

export class loginAPI {
  @ApiProperty()
  login: string;

  @ApiProperty()
  senha: string;
}
