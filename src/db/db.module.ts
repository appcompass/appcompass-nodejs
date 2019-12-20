import { ConfigService } from '../config/config.service';
import { DBConfigService } from './db-config.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useClass: DBConfigService
    })
  ],
  providers: [],
  exports: []
})
export class DBModule {}
