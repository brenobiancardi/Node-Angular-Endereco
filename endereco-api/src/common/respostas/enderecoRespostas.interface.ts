import { EnderecoDTO } from './../../Enderecos/Endereco/endereco.interface';
export interface IEnderecoRespostas {
  status: number;
  mensagem: string;
  autenticado?: boolean;
  endereco?: EnderecoDTO[] | EnderecoDTO;
}
