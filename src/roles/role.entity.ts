import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import { CreatedUpdatedDates } from '../db/embeded-entities/created-updated-dates';
import { Permission } from '../permissions/permission.entity';
import { User } from '../users/user.entity';

@Entity('roles')
export class Role {
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

  @ManyToOne(() => Permission, permission => permission.assignableRoles)
  @JoinColumn({ name: 'assignable_by_id' })
  public assignableBy: Permission;

  @ManyToMany(() => Permission, permission => permission.roles)
  @JoinTable({
    name: 'role_permission',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id'
    }
  })
  public permissions: Permission[];

  @ManyToMany(() => User, user => user.roles)
  public users: User[];

  @Column(() => CreatedUpdatedDates, { prefix: '' })
  public at: CreatedUpdatedDates;
}
