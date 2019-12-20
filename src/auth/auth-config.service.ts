import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

import { ConfigService } from '../config/config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthConfigService implements JwtOptionsFactory {
  constructor(private readonly config: ConfigService = null) {}
  createJwtOptions(): JwtModuleOptions {
    return this.configuration;
  }

  get configuration() {
    const config = this.config.auth;
    return {
      ...config,
      signOptions: { expiresIn: '60s' }
    };
  }
}
