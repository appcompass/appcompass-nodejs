import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DBModule } from './db/db.module';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [ConfigModule, DBModule, AuthModule, MessagingModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
