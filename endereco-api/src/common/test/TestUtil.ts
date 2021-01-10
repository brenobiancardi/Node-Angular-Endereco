import { EnderecoDTO } from './../../Enderecos/Endereco/endereco.interface';
import { UsuarioDTO } from './../../Usuarios/Usuario/usuario.interface';

export default class TestUtil {
  static fornecaMeUmUsuarioValido(): UsuarioDTO {
    const usuario: UsuarioDTO = {
      id: 1,
      tipoUsuario: 'default_admin',
      nome: 'Breno Biancardi',
      login: 'breno',
      senha: 'senhasegura',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return usuario;
  }

  static fornecaMeUmEnderecoValido(): EnderecoDTO {
    const endereco: EnderecoDTO = {
      id: 1,
      tpLogr: 'Avenida',
      logradouro: 'Endereco pra testar',
      bairro: 'Goiabeiras',
      cidade: 'Vitoria',
      uf: 'ES',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return endereco;
  }
}
