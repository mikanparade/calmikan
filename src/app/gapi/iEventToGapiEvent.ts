import { Frequency, RRule, RRuleSet, Weekday } from 'rrule';
import { IEvent } from '../types/IEvent';
/// <reference types='gapi.client.calendar-v3'>

const freqStringToEnum = (
  value: NonNullable<IEvent['recurrence']>['freq'],
): Frequency | undefined => {
  if (value === 'secondly') return Frequency.SECONDLY;
  if (value === 'minutely') return Frequency.MINUTELY;
  if (value === 'hourly') return Frequency.HOURLY;
  if (value === 'daily') return Frequency.DAILY;
  if (value === 'monthly') return Frequency.MONTHLY;
  if (value === 'yearly') return Frequency.YEARLY;
  return undefined;
};

const weekdayToRRuleWeekdayObj = (
  value: NonNullable<NonNullable<IEvent['recurrence']>['byDay']>[number],
): Weekday => {
  if (value === 'su') return RRule.SU;
  if (value === 'mo') return RRule.MO;
  if (value === 'tu') return RRule.TU;
  if (value === 'we') return RRule.WE;
  if (value === 'th') return RRule.TH;
  if (value === 'fr') return RRule.FR;
  return RRule.SA;
};

export const iEventToGapiEvent = (
  event: IEvent & { id: string | undefined },
): gapi.client.calendar.Event => {
  const { recurrence } = event;
  const rrule = new RRuleSet();
  rrule.rrule(
    new RRule({
      freq: freqStringToEnum(recurrence?.freq),
      dtstart: recurrence?.dtStart,
      tzid: recurrence?.tzId,
      until: recurrence?.until,
      count: recurrence?.count,
      interval: recurrence?.interval,
      wkst: recurrence?.weekStart ? weekdayToRRuleWeekdayObj(recurrence?.weekStart) : undefined,
      byweekday: recurrence?.byDay?.map(weekdayToRRuleWeekdayObj) ?? [],
      byhour: recurrence?.byHour,
      byminute: recurrence?.byMinute,
      bysecond: recurrence?.bySecond,
    }),
  );
  recurrence?.excludeDate?.forEach(rrule.exdate);
  recurrence?.rDate?.forEach(rrule.rdate);

  return {
    id: event.id,
    summary: event.name,
    start: {
      date: event.allDay ? event.start.toISOString() : undefined,
      dateTime: !event.allDay ? event.start.toISOString() : undefined,
    },
    end: {
      date: event.allDay ? event.end.toISOString() : undefined,
      dateTime: !event.allDay ? event.end.toISOString() : undefined,
    },
    recurrence: rrule
      .toString()
      .split('\n')
      .filter((str) => !str.startsWith('DTSTART') && !str.startsWith('DTEND')),
  };
};
