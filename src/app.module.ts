import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DBModule } from './db/db.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
@Module({
  imports: [ConfigModule, DBModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
