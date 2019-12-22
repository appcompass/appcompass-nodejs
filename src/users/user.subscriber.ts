import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { EntitySubscriberInterface, InsertEvent, Connection } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectConnection } from '@nestjs/typeorm';

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
    console.log('BEFORE POST INSERTED: ', event.entity);
  }
}
