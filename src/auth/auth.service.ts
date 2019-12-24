import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

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
    return { token };
  }
}
