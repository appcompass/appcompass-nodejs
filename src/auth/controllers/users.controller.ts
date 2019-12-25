import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserPayload } from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';

@Controller({
  path: 'users'
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard())
  @Post('create')
  async login(@Body() payload: CreateUserPayload) {
    return this.usersService.create(payload);
  }

  @UseGuards(AuthGuard())
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
