import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserPayload } from '../dto/user-create.dto';
import { SortUserListQuery } from '../dto/user-list.dto';
import { UpdateUserPayload } from '../dto/user-update.dto';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Controller()
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @UseGuards(AuthGuard())
  @Post('users')
  async create(@Body() payload: CreateUserPayload) {
    return this.usersService.create(payload);
  }

  @UseGuards(AuthGuard())
  @Get('users')
  async list(@Query() query: SortUserListQuery) {
    const { skip, take, order } = query;
    // TODO: pull this out into a utility function. All list requests will have this option.
    const structuredOrder = order
      .split(',')
      .map(row => row.split(':'))
      .reduce((o, [k, v]) => ((o[k.trim()] = (v || 'asc').trim()), o), {});

    const options = {
      skip: +skip,
      take: +take,
      order: structuredOrder
    };

    return this.usersService.findAll(options);
  }

  @UseGuards(AuthGuard())
  @Put('users/:id')
  async update(@Param('id') id: number, @Body() payload: UpdateUserPayload) {
    const password = payload.password
      ? await this.authService.setPassword(payload.password)
      : undefined;
    return this.usersService.update(id, { ...payload, password });
  }

  @UseGuards(AuthGuard())
  @Delete('users/:id')
  async delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
