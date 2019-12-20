import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CreatedUpdatedDates } from '../embeded-entities/CreatedUpdatedDates';

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
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  active: boolean;

  @Column({ type: 'varchar', length: 64 })
  activationCode: string;

  @Column({ type: 'timestamp' })
  activatedAt: Date;

  @Column({ type: 'timestamp' })
  lastLogin: Date;

  @Column(() => CreatedUpdatedDates, { prefix: '' })
  at: CreatedUpdatedDates;
}
