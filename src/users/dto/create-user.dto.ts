import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';

import { IsEmailAlreadyUsed } from '../unique-email.validator';

export class CreateUserPayload {
  @IsEmail()
  @Validate(IsEmailAlreadyUsed, {
    message: 'user with email $value already exists.'
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
