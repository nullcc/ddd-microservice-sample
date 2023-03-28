import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AUTH_CONFIG } from '@infrastructure/config/auth.config';

@Module({
  imports: [JwtModule.register({ secret: AUTH_CONFIG.jwtSecret })],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
