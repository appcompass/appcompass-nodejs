import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { CreatedUpdatedDates } from '../db/embeded-entities/created-updated-dates';
import { Role } from '../roles/role.entity';
import { User } from '../users/user.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false
  })
  public name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public label: string;

  @Column({ type: 'text', nullable: false })
  public description: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  public system: number;

  @ManyToOne(
    () => Permission,
    permission => permission.assignablePermissions
  )
  @JoinColumn({ name: 'assignable_by_id' })
  public assignableBy: Permission;

  @OneToMany(
    () => Permission,
    permission => permission.assignableBy
  )
  public assignablePermissions: Permission[];

  @OneToMany(
    () => Role,
    role => role.assignableBy
  )
  public assignableRoles: Role[];

  @ManyToMany(
    () => User,
    user => user.permissions
  )
  public users: User[];

  @ManyToMany(
    () => Role,
    role => role.permissions
  )
  public roles: Role[];

  @Column(() => CreatedUpdatedDates, { prefix: '' })
  public at: CreatedUpdatedDates;
}
