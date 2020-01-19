import * as moment from 'moment';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthConfigService } from '../auth-config.service';
import { UsersService } from '../services/users.service';
import { DecodedToken } from '../types/token';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly config: AuthConfigService,
    private readonly userService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secret
    });
  }

  async validate(token: DecodedToken) {
    const user = await this.userService.findBy({ id: token.sub });
    if (user.tokenExpiration.isBefore(moment.unix(token.exp))) return false;

    return user;
  }
}
