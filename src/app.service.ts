import { ConfigService } from './config/config.service';
import { Injectable } from '@nestjs/common';

export interface StatusResponse {
  serviceName: string;
  gitHash: string;
  version: string;
}

@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService) {}

  getStatus(): StatusResponse {
    return {
      serviceName: this.config.service.name,
      gitHash: this.config.service.gitHash,
      version: this.config.service.version
    };
  }
}
