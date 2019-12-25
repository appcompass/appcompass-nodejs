import { ConnectionOptions } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { Permission } from '../auth/entities/permission.entity';
import { RolePermission } from '../auth/entities/role-permission.entity';
import { Role } from '../auth/entities/role.entity';
import { UserPermission } from '../auth/entities/user-permission.entity';
import { UserRole } from '../auth/entities/user-role.entity';
import { User } from '../auth/entities/user.entity';
import { ConfigService } from '../config/config.service';
import { DBNamingStrategy } from './naming.strategy';

@Injectable()
export class DBConfigService implements TypeOrmOptionsFactory {
  private entities: Function[] = [
    User,
    Role,
    Permission,
    UserRole,
    UserPermission,
    RolePermission
  ];

  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return this.config;
  }

  get config() {
    return {
      type: this.configService.get('DB_TYPE'),
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USER'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
      synchronize: this.configService.get('DB_SYNCHRONIZE'),
      namingStrategy: new DBNamingStrategy(),
      entities: this.entities,
      migrations: [`${__dirname}/migrations/*`],
      cli: {
        entitiesDir: 'src/db/entities',
        migrationsDir: 'src/db/migrations',
        subscribersDir: 'src/db/subscribers'
      }
    } as ConnectionOptions;
  }
}
