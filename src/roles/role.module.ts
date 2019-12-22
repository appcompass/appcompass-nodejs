import { DBConfigService } from '../db/db-config.service';
import { Module } from '@nestjs/common';
import { Role } from './role.entity';
import { RolesService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [DBConfigService, RolesService],
  exports: [TypeOrmModule, RolesService]
})
export class RolesModule {}
