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
import { UsersService } from '../services/users.service';

@Controller({
  path: 'users'
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard())
  @Post()
  async create(@Body() payload: CreateUserPayload) {
    return this.usersService.create(payload);
  }

  @UseGuards(AuthGuard())
  @Get()
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
  @Put(':id')
  async update(@Param('id') id: number, @Body() payload: UpdateUserPayload) {
    return this.usersService.save(id, payload);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
