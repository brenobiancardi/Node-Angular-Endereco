import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from './usuario.entity';

@Module({
  imports: [DatabaseModule, SequelizeModule.forFeature([Usuario])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
