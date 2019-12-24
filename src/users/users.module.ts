import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DBConfigService } from '../db/db-config.service';
import { IsEmailAlreadyUsed } from './unique-email.validator';
import { User } from './user.entity';
import { UserSubscriber } from './user.subscriber';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    DBConfigService,
    UsersService,
    UserSubscriber,
    IsEmailAlreadyUsed
  ],
  exports: [TypeOrmModule, UsersService]
})
export class UsersModule {}
