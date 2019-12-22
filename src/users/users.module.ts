import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DBConfigService } from '../db/db-config.service';
import { User } from './user.entity';
import { UserSubscriber } from './user.subscriber';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [DBConfigService, UsersService, UserSubscriber],
  exports: [TypeOrmModule, UsersService]
})
export class UsersModule {}
