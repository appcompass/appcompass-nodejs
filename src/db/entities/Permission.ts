import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { CreatedUpdatedDates } from '../embeded-entities/CreatedUpdatedDates';
import { Role } from './Role';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false
  })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  label: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @ManyToOne(() => Permission, permission => permission.assignablePermissions)
  @JoinColumn({ name: 'assignable_by_id' })
  assignableBy: Permission;

  @OneToMany(() => Permission, permission => permission.assignableBy)
  assignablePermissions: Permission[];

  @OneToMany(() => Role, role => role.assignableBy)
  assignableRoles: Role[];

  @Column({ type: 'boolean', default: false, nullable: false })
  system: number;

  @Column(() => CreatedUpdatedDates, { prefix: '' })
  at: CreatedUpdatedDates;
}
