import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DBConfigService } from '../db/db-config.service';
import { Role } from './role.entity';
import { RolesService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [DBConfigService, RolesService],
  exports: [TypeOrmModule, RolesService]
})
export class RolesModule {}
