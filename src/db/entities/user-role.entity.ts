import { Column, Entity, PrimaryColumn } from 'typeorm';

import { CreatedUpdatedDates } from '../embeded-entities/created-updated-dates';

@Entity('user_role')
export class UserRole {
  @PrimaryColumn()
  public userId: number;

  @PrimaryColumn()
  public roleId: number;

  @Column(() => CreatedUpdatedDates, { prefix: '' })
  public at: CreatedUpdatedDates;
}
