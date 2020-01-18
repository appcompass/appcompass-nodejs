import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { CreatedUpdatedDates } from '../../db/embeded-entities/created-updated-dates';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity('user_role')
export class UserRole {
  @PrimaryColumn()
  public userId: number;

  @PrimaryColumn()
  public roleId: number;

  @Column(() => CreatedUpdatedDates, { prefix: '' })
  public at: CreatedUpdatedDates;

  @ManyToOne(
    () => User,
    user => user.userToRoles,
    { onDelete: 'CASCADE' }
  )
  public user!: User;

  @ManyToOne(
    () => Role,
    role => role.roleToUsers,
    { onDelete: 'CASCADE' }
  )
  public role!: Role;
}
