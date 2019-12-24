import { FindConditions, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserPayload } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findBy(conditions: FindConditions<User>): Promise<User> {
    return await this.userRepository.findOne(conditions);
  }

  async create(user: CreateUserPayload | User): Promise<User> {
    const check = await this.userRepository.findOne({ email: user.email });
    if (check) throw new Error('user exists!'); // needs to be properly handled.
    return this.userRepository.save(user);
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
