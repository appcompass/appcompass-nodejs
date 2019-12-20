import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import { CreatedUpdatedDates } from '../embeded-entities/CreatedUpdatedDates';
import { Permission } from './Permission';

@Entity('roles')
export class Role {
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

  @ManyToOne(() => Permission, permission => permission.assignableRoles)
  @JoinColumn({ name: 'assignable_by_id' })
  assignableBy: Permission;

  @Column(() => CreatedUpdatedDates, { prefix: '' })
  at: CreatedUpdatedDates;
}
