import { IEvent } from './IEvent';
import { TLeeway } from './TLeeway';

export interface IMonthCalendar {
  year: number;
  month: number;
  events: IEvent[];
  leeways: TLeeway[];
}
