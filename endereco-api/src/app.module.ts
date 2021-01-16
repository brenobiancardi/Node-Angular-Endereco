import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsuariosModule } from './Usuarios/usuarios.module';

import { EnderecosModule } from './enderecos/enderecos.module';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsuariosModule, EnderecosModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
