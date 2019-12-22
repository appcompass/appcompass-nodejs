import { DBConfigService } from '../db/db-config.service';
import { Module } from '@nestjs/common';
import { Permission } from './permission.entity';
import { PermissionsService } from './permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [DBConfigService, PermissionsService],
  exports: [TypeOrmModule, PermissionsService]
})
export class PermissionsModule {}
