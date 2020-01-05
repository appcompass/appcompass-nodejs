import {
  Connection,
  FindConditions,
  FindManyOptions,
  Repository
} from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(options?: FindManyOptions<User>): Promise<User[]> {
    return await this.userRepository.find(options);
  }

  async findBy(conditions: FindConditions<User>) {
    return await this.userRepository.findOne(conditions);
  }

  async create(user: Partial<User>) {
    return await this.userRepository.save(user);
  }

  async save(id: number, updateData: Partial<User>) {
    return await this.userRepository.save(
      { ...updateData, id: +id },
      { reload: true }
    );
  }

  async delete(id: number) {
    const { affected } = await this.connection.transaction(() =>
      this.connection
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('id = :id', { id })
        .execute()
    );

    return { affected };
  }
}
