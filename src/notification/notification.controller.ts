import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationController {
  @MessagePattern('send_email')
  getServiceStatus(@Payload() payload: any) {
    // TODO: Handle sending email.
    console.log(payload);
    return { payload };
  }
}
