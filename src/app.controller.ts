import { Controller, Get } from '@nestjs/common';

import { AppService, StatusResponse } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('status')
  getServiceStatus(): StatusResponse {
    return this.appService.getStatus();
  }
}
