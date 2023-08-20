/// <reference types="gapi.client.calendar-v3">

export interface IEvent {
  name: string;
  start: Date;
  end: Date;
  calendarId: string;
  bgColor: string;
  fgColor: string;
  recurrence?: {
    freq?: 'daily' | 'weekly' | 'monthly' | undefined;
    dtStart?: Date;
    tzId?: string;
    until?: Date;
    count?: number;
    interval?: number;
    weekStart?: 'su' | 'mo' | 'tu' | 'we' | 'th' | 'fr' | 'st';
    byDay?: 'su' | 'mo' | 'tu' | 'we' | 'th' | 'fr' | 'st';
    byMonth?: number[];
    bySetPos: number[];
    byMonthDay: number[];
    byYearDay?: number[];
    byWeekNumber?: number[];
    byHour?: number[];
    byMinute?: number[];
    bySecond?: number[];
    excludeDate?: Date[];
  };
}
