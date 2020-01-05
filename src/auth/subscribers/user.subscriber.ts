import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent
} from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';

@Injectable()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  private saltRounds = 10;

  constructor(@InjectConnection() readonly connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert({ entity: user }: InsertEvent<User>) {
    user.activationCode = crypto
      .createHash('sha256')
      .update(user.email)
      .digest('hex');

    user.password = await this.setPassword(user.password);
  }

  async beforeUpdate?({ entity: user }: UpdateEvent<User>) {
    if (user.password) user.password = await this.setPassword(user.password);
  }

  private async setPassword(password): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }
}
