import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as moment from 'moment';
import { User } from 'src/auth/entities/user.entity';
import { MessagingService } from 'src/messaging/messaging.service';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { RegisterUserDto } from '../dto/auth-register.dto';
import { ResetPasswordDto } from '../dto/auth-reset-password.dto';
import { DecodedToken } from '../types/token';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  private saltRounds = 10;

  constructor(
    private readonly usersService: UsersService,
    private readonly messagingService: MessagingService,
    private readonly jwtService: JwtService
  ) {}

  async register(data: RegisterUserDto) {
    const activationCode = crypto
      .createHash('sha256')
      .update(data.email)
      .digest('hex');

    const password = await this.setPassword(data.password);

    await this.usersService.save({
      email: data.email,
      password,
      activationCode
    });

    // TODO: clean up this work a bit more. Hard coding is a no go.
    await this.messagingService.sendAsync<any>('notifier.send.email', {
      subject: 'Confirm Registration',
      body: [
        'Thank you for registering!',
        'Please use the following link to confirm your email address:',
        this.getConfirmationLink(activationCode)
      ]
    });

    return { activationCode, sentEmail: true };
  }

  async setPassword(password): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  // TODO: clean up this work a bit more along with above. Hard coding is a no go.
  private getConfirmationLink(activationCode: string) {
    return `http://127.0.0:3000/confirm-registration?code=${activationCode}`;
  }

  async confirmRegistration(activationCode: string) {
    const user = await this.usersService.findBy({ activationCode });
    // TODO: email user confirmaiton activation.
    return await this.usersService.update(user.id, {
      active: true,
      activatedAt: moment(),
      activationCode: ''
    });
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findBy({ email });
    // TODO: generate and store reset token
    // TODO: email user
    // TODO: return reset
    return user.email;
  }

  async resetPassword({
    code,
    email,
    password
  }: Omit<ResetPasswordDto, 'password_confirm'>) {
    // TODO: get stored token by 'code'
    code;
    const { id } = await this.usersService.findBy({ email });

    return await this.usersService.update(id, {
      password: await this.setPassword(password)
    });
  }

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findBy({ email, active: true });
    if (!user) return null;
    if (await bcrypt.compare(pass, user.password)) return user;
  }

  async login(user: User) {
    const { id, email } = user;
    const payload = { email, sub: id };
    const token = await this.jwtService.signAsync(payload);
    const decoded = this.jwtService.decode(token) as DecodedToken;

    await this.usersService.update(id, {
      lastLogin: moment(),
      tokenExpiration: moment.unix(decoded.exp)
    });

    return { token };
  }

  async logout(user: User) {
    await this.usersService.update(user.id, {
      tokenExpiration: moment()
    });

    return { success: true };
  }
}
