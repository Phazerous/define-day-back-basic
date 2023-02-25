import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-cookie';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export default class CookieStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      cookieName: 'token',
      signed: false,
      passReqToCallback: false,
    });
  }

  async validate(token: string): Promise<any> {
    const user = await this.authService.validateUser(token);

    return user;
  }
}
