import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { CreatedUpdatedDates } from '../../db/embeded-entities/created-updated-dates';
import { Permission } from './permission.entity';
import { User } from './user.entity';

@Entity('user_permission')
export class UserPermission {
  @PrimaryColumn()
  public userId: number;

  @PrimaryColumn()
  public permissionId: number;

  @ManyToOne(
    () => User,
    user => user.userToPermissions,
    { onDelete: 'CASCADE' }
  )
  public user!: User;

  @ManyToOne(
    () => Permission,
    permission => permission.permissionToUsers,
    { onDelete: 'CASCADE' }
  )
  public permission!: Permission;

  @Column(() => CreatedUpdatedDates, { prefix: '' })
  public at: CreatedUpdatedDates;
}
