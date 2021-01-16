export interface ILoginRespostas {
  status: number;
  mensagem: string;
  autenticado?: boolean;
  token?: string;
}
