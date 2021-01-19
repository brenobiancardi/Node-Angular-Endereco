import { Address } from '../address/address.model';

export interface ResponseAPI {
  status: number;
  autenticado: boolean;
  mensagem: string;
  token: string;
  usuario: {
    nome: string;
  };
}

export interface AddressResponseArray {
  status: number;
  mensagem: string;
  endereco: Address[];
}

export interface AddressResponse {
  status: number;
  mensagem: string;
  endereco: Address;
}
