import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ modelName: 'usuarios' })
export class Usuario extends Model<Usuario> {
  @Column({ primaryKey: true, autoIncrement: true })
  id?: number;

  @Column({
    type: DataType.STRING(15),
    defaultValue: 'usuario',
    field: 'tipo_usuario',
  })
  tipoUsuario?: string;

  @Column
  nome: string;

  @Column
  login: string;

  @Column
  senha: string;

  @Column
  createdAt?: Date;

  @Column
  updatedAt?: Date;
}
