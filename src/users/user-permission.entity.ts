import { Column, Entity, PrimaryColumn } from 'typeorm';

import { CreatedUpdatedDates } from '../db/embeded-entities/created-updated-dates';

@Entity('user_permission')
export class UserPermission {
  @PrimaryColumn()
  public userId: number;

  @PrimaryColumn()
  public permissionId: number;

  @Column(() => CreatedUpdatedDates, { prefix: '' })
  public at: CreatedUpdatedDates;
}
