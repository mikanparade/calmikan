import { ByWeekday, Frequency, RRule, RRuleSet, Weekday, WeekdayStr } from 'rrule';
import { IEvent } from '../types/IEvent';

const freqEnumToString = (freqEnum: Frequency): NonNullable<IEvent['recurrence']>['freq'] => {
  if (freqEnum === Frequency.SECONDLY) return 'secondly';
  if (freqEnum === Frequency.MINUTELY) return 'minutely';
  if (freqEnum === Frequency.HOURLY) return 'hourly';
  if (freqEnum === Frequency.DAILY) return 'daily';
  if (freqEnum === Frequency.WEEKLY) return 'weekly';
  if (freqEnum === Frequency.MONTHLY) return 'monthly';
  if (freqEnum === Frequency.YEARLY) return 'yearly';
};

const weekdayNumberToString = (
  number: number,
): NonNullable<NonNullable<IEvent['recurrence']>['weekStart']> => {
  if (number === 1) return 'su';
  if (number === 2) return 'mo';
  if (number === 3) return 'tu';
  if (number === 4) return 'we';
  if (number === 5) return 'th';
  if (number === 6) return 'fr';
  return 'sa';
};

const weekdayObjToString = (
  weekdayObj: Weekday,
): NonNullable<NonNullable<IEvent['recurrence']>['weekStart']> => {
  if (weekdayObj.toString() === 'SU') return 'su';
  if (weekdayObj.toString() === 'MO') return 'mo';
  if (weekdayObj.toString() === 'TU') return 'tu';
  if (weekdayObj.toString() === 'WE') return 'we';
  if (weekdayObj.toString() === 'TH') return 'th';
  if (weekdayObj.toString() === 'FR') return 'fr';
  return 'sa';
};

const weekdayStrToString = (
  weekdayStr: WeekdayStr,
): NonNullable<NonNullable<IEvent['recurrence']>['weekStart']> => {
  return weekdayStr.toLowerCase() as NonNullable<NonNullable<IEvent['recurrence']>['weekStart']>;
};

const byWeekDayToString = (
  value: ByWeekday,
): NonNullable<NonNullable<IEvent['recurrence']>['byDay']>[number] => {
  if (typeof value === 'number') return weekdayNumberToString(value);
  if (typeof value === 'string') return weekdayStrToString(value);
  return weekdayObjToString(value);
};

const wrapIfNotArray = <T>(value: T | T[]): T[] => {
  if (Array.isArray(value)) return value;
  return [value];
};

export const rruleToEventRrule = (rrule: RRuleSet | RRule): IEvent['recurrence'] => {
  const options = rrule.options;

  return {
    freq: options.freq ? freqEnumToString(options.freq) : undefined,
    dtStart: options.dtstart ?? undefined,
    tzId: options.tzid ?? undefined,
    until: options.until ?? undefined,
    count: options.count ?? undefined,
    interval: options.interval ?? undefined,
    weekStart: typeof options.wkst === 'number' ? weekdayNumberToString(options.wkst) : undefined,
    byDay: options.byweekday ? wrapIfNotArray(options.byweekday).map(byWeekDayToString) : undefined,
    byMonth: options.bymonth ? wrapIfNotArray(options.bymonth) : undefined,
    bySetPos: options.bysetpos ? wrapIfNotArray(options.bysetpos) : undefined,
    byMonthDay: options.bymonthday ? wrapIfNotArray(options.bymonthday) : undefined,
    byYearDay: options.byyearday ? wrapIfNotArray(options.byyearday) : undefined,
    byWeekNumber: options.byweekno ? wrapIfNotArray(options.byweekno) : undefined,
    byHour: options.byhour ? wrapIfNotArray(options.byhour) : undefined,
    byMinute: options.byminute ? wrapIfNotArray(options.byminute) : undefined,
    bySecond: options.bysecond ? wrapIfNotArray(options.bysecond) : undefined,
    excludeDate: rrule instanceof RRuleSet ? rrule.exdates() : undefined,
    rDate: rrule instanceof RRuleSet ? rrule.rdates() : undefined,
  };
};
