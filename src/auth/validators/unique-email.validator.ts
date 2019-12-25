import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

import { Injectable } from '@nestjs/common';

import { UsersService } from '../services/users.service';

@ValidatorConstraint({ name: 'isEmailUsed', async: true })
@Injectable()
export class IsEmailUsedValidator implements ValidatorConstraintInterface {
  constructor(protected readonly usersService: UsersService) {}
  async validate(email: string) {
    const user = await this.usersService.findBy({ email });
    return !user;
  }

  defaultMessage(args: ValidationArguments) {
    return `user with email '${args.value}' already exists.`;
  }
}

export function IsEmailUsed(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsEmailUsed',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsEmailUsedValidator
    });
  };
}
