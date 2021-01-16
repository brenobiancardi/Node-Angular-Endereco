import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsuariosModule } from './../Usuarios/usuarios.module';

import { AuthService } from './auth.service';

import { JwtStrategy } from './jwt.strategy';

import { jwtConstants } from './constantes';

@Module({
  imports: [
    UsuariosModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3000000s' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
