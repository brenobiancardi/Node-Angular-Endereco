import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Endereco } from 'src/enderecos/endereco.entity';
import { Usuario } from 'src/Usuarios/usuario.entity';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'tarefas_bd',
        models: [Usuario, Endereco],
        autoLoadModels: true,
        synchronize: false,
        force: false,
        //alter: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
