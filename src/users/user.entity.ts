import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { CreatedUpdatedDates } from '../db/embeded-entities/created-updated-dates';
import { Permission } from '../permissions/permission.entity';
import { Role } from '../roles/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 64,
    unique: true,
    nullable: false
  })
  public email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public password: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  public active: boolean;

  @Column({ type: 'varchar', length: 64 })
  public activationCode: string;

  @Column({ type: 'timestamp', nullable: true })
  public activatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  public lastLogin: Date;

  @Column(() => CreatedUpdatedDates, { prefix: '' })
  public at: CreatedUpdatedDates;

  @ManyToMany(
    () => Permission,
    permission => permission.users
  )
  @JoinTable({
    name: 'user_permission',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id'
    }
  })
  public permissions: Permission[];

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id'
    }
  })
  public roles: Role[];
}
