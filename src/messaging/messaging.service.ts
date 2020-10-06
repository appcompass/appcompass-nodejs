import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport
} from '@nestjs/microservices';

import { ConfigService } from '../config/config.service';

@Injectable()
export class MessagingService {
  private client: ClientProxy;
  constructor(private configService: ConfigService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: configService.get('REDIS_URL')
      }
    });
  }

  send<T>(pattern: string, data?: T) {
    return this.client.send<T, T>(pattern, data);
  }

  sendAsync<T>(pattern: string, data?: T) {
    return this.send<T>(pattern, data).toPromise();
  }
}
