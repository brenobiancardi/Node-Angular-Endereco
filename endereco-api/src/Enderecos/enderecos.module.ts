import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from 'src/database/database.module';
import { Endereco } from './endereco.entity';
import { EnderecosService } from './enderecos.service';
import { EnderecosController } from './enderecos.controller';

@Module({
  imports: [DatabaseModule, SequelizeModule.forFeature([Endereco])],
  controllers: [EnderecosController],
  providers: [EnderecosService],
})
export class EnderecosModule {}
