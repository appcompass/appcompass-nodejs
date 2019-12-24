import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserPayload } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller({
  path: 'users'
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async login(@Body() payload: CreateUserPayload) {
    return this.usersService.create(payload);
  }
}
