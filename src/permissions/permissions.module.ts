import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DBConfigService } from '../db/db-config.service';
import { Permission } from './permission.entity';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [DBConfigService, PermissionsService],
  exports: [TypeOrmModule, PermissionsService]
})
export class PermissionsModule {}
