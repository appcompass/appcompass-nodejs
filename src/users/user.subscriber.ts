import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Connection, EntitySubscriberInterface, InsertEvent } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';

import { User } from './user.entity';

@Injectable()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  private saltRounds = 10;

  constructor(@InjectConnection() readonly connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    const user = event.entity;
    user.activationCode = crypto
      .createHash('sha256')
      .update(user.email)
      .digest('hex');

    user.password = await bcrypt.hash(user.password, this.saltRounds);
  }
}
