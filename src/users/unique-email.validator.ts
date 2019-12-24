import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

import { Injectable } from '@nestjs/common';

import { UsersService } from './users.service';

@ValidatorConstraint({ name: 'isEmailAlreadyUsed', async: true })
@Injectable()
export class IsEmailAlreadyUsed implements ValidatorConstraintInterface {
  constructor(protected readonly usersService: UsersService) {}
  async validate(email: string) {
    const user = await this.usersService.findByEmail(email);
    return !user;
  }
}
