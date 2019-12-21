import { Column, Entity, PrimaryColumn } from 'typeorm';

import { CreatedUpdatedDates } from '../embeded-entities/created-updated-dates';

@Entity('role_permission')
export class RolePermission {
  @PrimaryColumn()
  public roleId: number;

  @PrimaryColumn()
  public permissionId: number;

  @Column(() => CreatedUpdatedDates, { prefix: '' })
  public at: CreatedUpdatedDates;
}
