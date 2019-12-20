import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreatedUpdatedDates {
  @CreateDateColumn({ name: 'created_at' })
  created: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated: Date;
}
