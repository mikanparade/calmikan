import { RRule } from 'rrule';

export interface IEvent {
  id: string;
  summary: string;
  description: string;
  start: Date;
  end: Date;
  rrule: RRule | undefined;
  excludeDate: Date[];
  created: Date;
  updated: Date;
  recurrenceId: Date;
}
