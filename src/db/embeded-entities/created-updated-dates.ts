import { Moment } from 'moment';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { DateTransformer } from '../transformers/date.transformer';

export class CreatedUpdatedDates {
  @CreateDateColumn({ name: 'created_at', transformer: new DateTransformer() })
  created: Moment;

  @UpdateDateColumn({ name: 'updated_at', transformer: new DateTransformer() })
  updated: Moment;
}
