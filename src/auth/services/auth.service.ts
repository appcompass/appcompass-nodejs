import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { User } from 'src/auth/entities/user.entity';
import { MessagingService } from 'src/messaging/messaging.service';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ResetPasswordDto } from '../dto/auth-reset-password.dto';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly messagingService: MessagingService,
    private readonly jwtService: JwtService
  ) {}

  async register(data: Partial<User>) {
    const user = await this.usersService.save(data);

    // TODO: clean up this work a bit more. Hard coding is a no go.
    await this.messagingService.sendAsync<any>('send_email', {
      subject: 'Confirm Registration',
      body: [
        'Thank you for registering!',
        'Please use the following link to confirm your email address:',
        this.getConfirmationLink(user.activationCode)
      ]
    });

    return { activationCode: user.activationCode, sentEmail: true };
  }

  // TODO: clean up this work a bit more along with above. Hard coding is a no go.
  private getConfirmationLink(activationCode: string) {
    return `http://127.0.0:3000/confirm-registration?code=${activationCode}`;
  }

  async confirmRegistration(activationCode: string) {
    const user = await this.usersService.findBy({ activationCode });
    // TODO: email user confirmaiton activation.
    return await this.usersService.save({
      id: user.id,
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

    return this.usersService.save({ id, password });
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

    await this.usersService.save({ id, lastLogin: moment() });

    return { token };
  }

  async logout(user: User) {
    user; // TODO: handle logout flow.  blacklist maybe?
  }
}
