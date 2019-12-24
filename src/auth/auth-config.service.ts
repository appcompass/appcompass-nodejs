import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthConfigService implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return this.config;
  }

  get config() {
    return {
      secret: this.secret,
      signOptions: {
        expiresIn: this.expiresIn
      }
    };
  }

  get secret() {
    return this.configService.get('AUTH_SECRET');
  }

  get expiresIn() {
    return this.configService.get('AUTH_EXPIRES_IN');
  }
}
