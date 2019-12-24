import * as moment from 'moment';
import { ValueTransformer } from 'typeorm';

export class DateTransformer implements ValueTransformer {
  to(value: moment.Moment): Date {
    if (value) return value.toDate();
  }

  from(value: Date): moment.Moment {
    if (value) return moment(value);
  }
}
