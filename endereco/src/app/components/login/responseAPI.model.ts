export interface ResponseAPI {
  autenticado: boolean;
  token: string;
  usuario: {
    nome: string;
  };
}
