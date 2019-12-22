import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { ConfigService } from '../config/config.service';
import { DBNamingStrategy } from './naming.strategy';
import { Injectable } from '@nestjs/common';
import { Permission } from '../permissions/permission.entity';
import { Role } from '../roles/role.entity';
import { RolePermission } from '../roles/role-permission.entity';
import { User } from '../users/user.entity';
import { UserPermission } from '../users/user-permission.entity';
import { UserRole } from '../users/user-role.entity';

@Injectable()
export class DBConfigService implements TypeOrmOptionsFactory {
  private entities: any[] = [
    User,
    Role,
    Permission,
    UserRole,
    UserPermission,
    RolePermission
  ];

  constructor(private readonly config: ConfigService = null) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return this.configuration;
  }

  get configuration() {
    const config = this.config.db;
    return {
      ...config,
      namingStrategy: new DBNamingStrategy(),
      type: 'postgres' as 'postgres',
      entities: this.entities,
      migrations: [`${__dirname}/migrations/*`],
      cli: {
        entitiesDir: 'src/db/entities',
        migrationsDir: 'src/db/migrations',
        subscribersDir: 'src/db/subscribers'
      }
    };
  }
}
