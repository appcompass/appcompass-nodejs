import * as dotenv from 'dotenv';
import { DatabaseType } from 'typeorm';

import * as Joi from '@hapi/joi';

export type EnvConfig = Record<string, string>;

export interface ValidConfig {
  NODE_ENV: string;
  SERVICE_HOST: string;
  SERVICE_PORT: number;
  REDIS_URL: string;
  DB_TYPE: DatabaseType;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_SYNCHRONIZE: boolean;
  AUTH_SECRET: string;
  AUTH_EXPIRES_IN: number;
  npm_package_name: string;
  npm_package_gitHead: string;
  npm_package_version: string;
}

export class ConfigService {
  private readonly config: ValidConfig;
  private schema: Joi.ObjectSchema = Joi.object({
    NODE_ENV: Joi.string().default('local'),
    SERVICE_HOST: Joi.string().default('0.0.0.0'),
    SERVICE_PORT: Joi.number().default(3000),
    REDIS_URL: Joi.string().default('redis://localhost:6379'),
    DB_TYPE: Joi.string().default('postgres'),
    DB_HOST: Joi.string().default('127.0.0.1'),
    DB_PORT: Joi.number().default(5432),
    DB_USER: Joi.string(),
    DB_PASSWORD: Joi.string().allow(''),
    DB_NAME: Joi.string(),
    DB_SYNCHRONIZE: Joi.boolean().default(true),
    AUTH_SECRET: Joi.string(),
    AUTH_EXPIRES_IN: Joi.number(),
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

  public get<K extends keyof ValidConfig>(key: K): ValidConfig[K] {
    return this.config[key];
  }
}
