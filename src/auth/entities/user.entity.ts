import { Moment } from 'moment';
import { DateTransformer } from 'src/db/transformers/date.transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CreatedUpdatedDates } from '../../db/embeded-entities/created-updated-dates';
import { UserPermission } from './user-permission.entity';
import { UserRole } from './user-role.entity';

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

  @Column({
    type: 'timestamp',
    nullable: true,
    transformer: new DateTransformer()
  })
  public activatedAt: Moment;

  @Column({
    type: 'timestamp',
    nullable: true,
    transformer: new DateTransformer()
  })
  public lastLogin: Moment;

  @Column(() => CreatedUpdatedDates, { prefix: '' })
  public at: CreatedUpdatedDates;

  @OneToMany(
    () => UserPermission,
    userPermission => userPermission.user
  )
  public userToPermissions: UserPermission[];

  @OneToMany(
    () => UserRole,
    userRole => userRole.user
  )
  public userToRoles: UserRole[];
}
