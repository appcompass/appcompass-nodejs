import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { CreatedUpdatedDates } from '../../db/embeded-entities/created-updated-dates';
import { Permission } from './permission.entity';
import { Role } from './role.entity';

@Entity('role_permission')
export class RolePermission {
  @PrimaryColumn()
  public roleId: number;

  @PrimaryColumn()
  public permissionId: number;

  @ManyToOne(
    () => Role,
    role => role.roleToPermissions
  )
  public role!: Role;

  @ManyToOne(
    () => Permission,
    permission => permission.permissionToRoles
  )
  public permission!: Permission;

  @Column(() => CreatedUpdatedDates, { prefix: '' })
  public at: CreatedUpdatedDates;
}
