import { Moment } from 'moment';
import { DateTransformer } from 'src/db/transformers/date.transformer';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import { User } from './user.entity';

@Entity('user_logins')
export class UserLogin {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn({ name: 'login_at', transformer: new DateTransformer() })
  loginAt: Moment;

  @ManyToOne(
    () => User,
    user => user.logins,
    { onDelete: 'CASCADE' }
  )
  public user!: User;
}
