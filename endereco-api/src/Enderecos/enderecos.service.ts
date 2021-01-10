import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Endereco } from './endereco.entity';
import { EnderecoDTO } from './Endereco/endereco.interface';

@Injectable()
export class EnderecosService {
  constructor(@InjectModel(Endereco) private enderecoModel: typeof Endereco) {}

  async obterTodos(): Promise<Endereco[]> {
    return this.enderecoModel.findAll<Endereco>();
  }

  async obterPorId(id: string): Promise<Endereco> {
    return this.enderecoModel.findOne<Endereco>({
      where: {
        id,
      },
    });
  }

  async criar(usuario: EnderecoDTO): Promise<Endereco> {
    const usuarioCriado = await this.enderecoModel.create(usuario);
    return usuarioCriado;
  }
}
