import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { ConfigService } from '../config/config.service';
import { DBNamingStrategy } from './db-naming.strategy';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DBConfigService implements TypeOrmOptionsFactory {
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
      entities: [`${__dirname}/entities/*{.ts,.js}`],
      migrations: [`${__dirname}/migrations/*.ts,.js`],
      subscribers: [`${__dirname}/subscribers/*.{ts,js}`],
      cli: {
        entitiesDir: 'src/db/entities',
        migrationsDir: 'src/db/migrations',
        subscribersDir: 'src/db/subscribers'
      }
    };
  }
}
