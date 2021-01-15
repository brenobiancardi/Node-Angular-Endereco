export interface IEnderecoDTO {
  id?: number;
  tpLogr?: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
  createdAt?: Date;
  updatedAt?: Date;
}
