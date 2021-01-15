import { HttpStatus } from '@nestjs/common';
import { IEnderecoDTO } from '../../Enderecos/Endereco/endereco.interface';
import { IUsuarioDTO } from '../../Usuarios/Usuario/usuario.interface';
import { IEnderecoRespostas } from 'src/common/respostas/enderecoRespostas.interface';
import { IUsuarioRespostas } from './../respostas/usuarioRespostas.interface';
export default class TestUtil {
  static fornecaMeUsuariosValidos(qtd: number): any {
    if (qtd === 1) {
      const usuario: IUsuarioDTO = {
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
    const usuarios: IUsuarioDTO[] = [];
    let i = 1;
    while (qtd >= i) {
      usuarios.push({
        id: i,
        tipoUsuario: 'default_admin',
        nome: 'Breno Biancardi',
        login: 'breno',
        senha: 'senhasegura',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      i++;
    }

    return usuarios;
  }

  static fornecaMeEnderecosValidos(qtd: number): any {
    if (qtd === 1) {
      const endereco: IEnderecoDTO = {
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
    const enderecos: IEnderecoDTO[] = [];
    let i = 1;
    while (qtd >= i) {
      enderecos.push({
        id: i,
        tpLogr: 'Avenida',
        logradouro: 'Endereco pra testar',
        bairro: 'Goiabeiras',
        cidade: 'Vitoria',
        uf: 'ES',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      i++;
    }

    return enderecos;
  }

  static fornecaMeUmEnderecoRespostaValido(qtd: number): IEnderecoRespostas {
    const enderecoResposta: IEnderecoRespostas = {
      status: HttpStatus.OK,
      mensagem: `${qtd} logradouros encontrados`,
      endereco: TestUtil.fornecaMeEnderecosValidos(qtd),
    };

    return enderecoResposta;
  }

  static fornecaMeUmUsuarioRespostaValido(qtd: number): IUsuarioRespostas {
    const usuarioResposta: IUsuarioRespostas = {
      status: HttpStatus.OK,
      mensagem: `${qtd} usuarios encontrados`,
      usuario: TestUtil.fornecaMeUsuariosValidos(qtd),
    };

    return usuarioResposta;
  }
}
