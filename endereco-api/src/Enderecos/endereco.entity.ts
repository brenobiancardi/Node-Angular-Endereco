import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ modelName: 'breno_enderecos' })
export class Endereco extends Model<Endereco> {
  @Column({ primaryKey: true, autoIncrement: true })
  id?: number;

  @Column({
    type: DataType.STRING(15),
    unique: 'UNIQUELOGR',
  })
  tpLogr?: string;

  @Column({
    allowNull: false,
    unique: 'UNIQUELOGR',
  })
  logradouro: string;

  @Column
  bairro: string;

  @Column
  cidade: string;

  @Column({
    type: DataType.STRING(2),
  })
  uf: string;

  @Column
  createdAt?: Date;

  @Column
  updatedAt?: Date;
}
