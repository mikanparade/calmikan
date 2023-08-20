/// <reference types="gapi.client.calendar-v3">

export interface IEvent {
  id: string;
  name: string;
  start: Date;
  end: Date;
  allDay: boolean;
  calendarId: string;
  bgColor: string;
  fgColor: string;
  recurrence?: {
    freq?:
      | 'secondly'
      | 'minutely'
      | 'hourly'
      | 'daily'
      | 'weekly'
      | 'monthly'
      | 'yearly'
      | undefined;
    dtStart?: Date;
    tzId?: string;
    until?: Date;
    count?: number;
    interval?: number;
    weekStart?: 'su' | 'mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa';
    byDay?: ('su' | 'mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa')[];
    byMonth?: number[];
    bySetPos?: number[];
    byMonthDay?: number[];
    byYearDay?: number[];
    byWeekNumber?: number[];
    byHour?: number[];
    byMinute?: number[];
    bySecond?: number[];
    excludeDate?: Date[];
    rDate?: Date[];
  };
}
