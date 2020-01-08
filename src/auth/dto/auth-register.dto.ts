import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { IsSameAs } from '../validators/is-same-as.validator';
import { IsEmailUsed } from '../validators/unique-email.validator';

export class RegisterUserPayload {
  @IsEmail()
  @IsEmailUsed()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @IsSameAs('password')
  readonly password_confirm: string;
}
