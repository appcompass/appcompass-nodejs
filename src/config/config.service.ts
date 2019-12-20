import * as Joi from '@hapi/joi';
import * as dotenv from 'dotenv';

import { DatabaseType } from 'typeorm';

export type EnvConfig = Record<string, string>;

export interface ValidConfig {
  NODE_ENV: string;
  SERVICE_HOST: string;
  SERVICE_PORT: number;
  DB_TYPE: DatabaseType;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_SYNCHRONIZE: boolean;
  AUTH_SECRET: string;
  npm_package_name: string;
  npm_package_gitHead: string;
  npm_package_version: string;
}

export interface ServiceConfig {
  env: string;
  host: string;
  port: number;
  name: string;
  gitHash: string;
  version: string;
}

export interface DatabaseConfig {
  type: DatabaseType;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
}

export interface AuthConfig {
  secret: string;
}

export class ConfigService {
  private readonly config: ValidConfig;
  private schema: Joi.ObjectSchema = Joi.object({
    NODE_ENV: Joi.string().default('local'),
    SERVICE_HOST: Joi.string().default('0.0.0.0'),
    SERVICE_PORT: Joi.number().default(3000),
    DB_TYPE: Joi.string().default('postgres'),
    DB_HOST: Joi.string().default('127.0.0.1'),
    DB_PORT: Joi.number().default(5432),
    DB_USER: Joi.string(),
    DB_PASSWORD: Joi.string().allow(''),
    DB_NAME: Joi.string(),
    DB_SYNCHRONIZE: Joi.boolean().default(true),
    AUTH_SECRET: Joi.string(),
    npm_package_name: Joi.string(),
    npm_package_gitHead: Joi.string(),
    npm_package_version: Joi.string()
  }).options({ stripUnknown: true });

  constructor(path: string = `${process.env.NODE_ENV || 'local'}.env`) {
    dotenv.config({ path });
    this.config = this.validate(process.env);
  }

  private validate(config: EnvConfig): ValidConfig {
    const { error, value } = this.schema.validate(config);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return value;
  }

  get service(): ServiceConfig {
    return {
      env: this.config.NODE_ENV,
      host: this.config.SERVICE_HOST,
      port: this.config.SERVICE_PORT,
      name: this.config.npm_package_name,
      gitHash: this.config.npm_package_gitHead,
      version: this.config.npm_package_version
    };
  }

  get db(): DatabaseConfig {
    return {
      type: this.config.DB_TYPE,
      host: this.config.DB_HOST,
      port: this.config.DB_PORT,
      username: this.config.DB_USER,
      password: this.config.DB_PASSWORD,
      database: this.config.DB_NAME,
      synchronize: this.config.DB_SYNCHRONIZE
    };
  }

  get auth(): AuthConfig {
    return {
      secret: this.config.AUTH_SECRET
    };
  }
}
