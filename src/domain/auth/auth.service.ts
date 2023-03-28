import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: string | Buffer | object): string {
    return this.jwtService.sign(payload);
  }

  decode(token: string): any {
    return this.jwtService.decode(token);
  }
}
