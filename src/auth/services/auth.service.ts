import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { User } from 'src/auth/entities/user.entity';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findBy({ email }); //, active: true
    if (!user) return null;
    if (await bcrypt.compare(pass, user.password)) {
      delete user.password;
      return user;
    }
  }

  async login(user: User) {
    const { id, email } = user;
    const payload = { email, sub: id };
    const token = await this.jwtService.signAsync(payload);

    user.lastLogin = moment();
    this.usersService.save(user);

    return { token };
  }

  async logout(user: User) {
    user; // handle logout flow.  blacklist maybe?
  }
}
