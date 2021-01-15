import { UsuarioDTO } from './../../Usuarios/Usuario/usuario.interface';
export interface IUsuarioRespostas {
  status: number;
  mensagem: string;
  autenticado?: boolean;
  token?: string;
  usuario?: UsuarioDTO[] | UsuarioDTO;
}
