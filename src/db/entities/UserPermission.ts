import { Column, Entity, PrimaryColumn } from 'typeorm';

import { CreatedUpdatedDates } from '../embeded-entities/CreatedUpdatedDates';

@Entity('user_permission')
export class UserPermission {
  @PrimaryColumn()
  public userId: number;

  @PrimaryColumn()
  public permissionId: number;

  @Column(() => CreatedUpdatedDates, { prefix: '' })
  public at: CreatedUpdatedDates;
}
