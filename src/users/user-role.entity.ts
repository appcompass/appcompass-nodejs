import { Column, Entity, PrimaryColumn } from 'typeorm';

import { CreatedUpdatedDates } from '../db/embeded-entities/created-updated-dates';

@Entity('user_role')
export class UserRole {
  @PrimaryColumn()
  public userId: number;

  @PrimaryColumn()
  public roleId: number;

  @Column(() => CreatedUpdatedDates, { prefix: '' })
  public at: CreatedUpdatedDates;
}
