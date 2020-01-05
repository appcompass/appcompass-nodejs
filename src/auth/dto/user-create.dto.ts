import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { IsEmailUsed } from '../validators/unique-email.validator';

export class CreateUserPayload {
  @IsEmail()
  @IsEmailUsed()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
