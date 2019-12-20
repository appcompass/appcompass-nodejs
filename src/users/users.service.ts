import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: 1,
        username: 'foo',
        password: 'bar'
      }
    ];
  }

  async find(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
