import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ExtractJwt } from 'passport-jwt';
import { AuthService } from '@domain/auth/auth.service';
import { AUTH_CONFIG } from '@infrastructure/config/auth.config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (token) {
      const obj = this.authService.decode(token);
      if (obj) {
        req.headers[AUTH_CONFIG.userHeader] = obj.username;
      }
    }
    next();
  }
}
