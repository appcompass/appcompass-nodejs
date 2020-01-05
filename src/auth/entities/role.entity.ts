import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { CreatedUpdatedDates } from '../../db/embeded-entities/created-updated-dates';
import { Permission } from './permission.entity';
import { RolePermission } from './role-permission.entity';
import { UserRole } from './user-role.entity';

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

  @ManyToOne(
    () => Permission,
    permission => permission.assignableRoles
  )
  @JoinColumn({ name: 'assignable_by_id' })
  public assignableBy: Permission;

  @OneToMany(
    () => UserRole,
    userRole => userRole.role
  )
  public roleToUsers: UserRole[];

  @OneToMany(
    () => RolePermission,
    rolePermission => rolePermission.role
  )
  public roleToPermissions: RolePermission[];

  @Column(() => CreatedUpdatedDates, { prefix: '' })
  public at: CreatedUpdatedDates;
}
