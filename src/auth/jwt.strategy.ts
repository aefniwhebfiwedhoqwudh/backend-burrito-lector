import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'super_secreto_burrito_2026', // La misma clave que pusimos en auth.module.ts
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, correo: payload.correo, rol: payload.rol };
  }
}