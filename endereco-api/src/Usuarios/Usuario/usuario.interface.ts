export interface IUsuarioDTO {
  id?: number;
  tipoUsuario?: string;
  nome: string;
  login: string;
  senha?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
