import { IsEmail, IsOptional, IsString } from 'class-validator';

import { IsEmailUsed } from '../validators/unique-email.validator';

export class UpdateUserPayload {
  @IsEmail()
  @IsEmailUsed()
  @IsOptional()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly password: string;
}
