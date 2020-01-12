import { Module } from '@nestjs/common';

import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

// TODO: pull this module out into it's own microservice.
@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService]
})
export class NotificationModule {}
