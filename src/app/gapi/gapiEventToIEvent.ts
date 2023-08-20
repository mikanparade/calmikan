import { IEvent } from '../types/IEvent';
import { rrulestr } from 'rrule';
import { rruleToEventRrule } from './rruleToEventRrule';

export const gapiEventToIEvent = (
  gapiEvent: gapi.client.calendar.Event,
  calendarId: string,
  colors: gapi.client.calendar.Colors,
  fgColor: string = '#f8f6f2',
  bgColor: string = '#32312f',
): IEvent | undefined => {
  if (
    !gapiEvent.id ||
    !gapiEvent.summary ||
    !gapiEvent.start ||
    (!gapiEvent.start.date && !gapiEvent.start.dateTime) ||
    !gapiEvent.end ||
    (!gapiEvent.end.date && !gapiEvent.end.dateTime) ||
    !gapiEvent.recurrence
  ) {
    return undefined;
  }

  return {
    id: gapiEvent.id,
    name: gapiEvent.summary,
    start: new Date(gapiEvent.start.date ?? gapiEvent.start.dateTime!),
    end: new Date(gapiEvent.end.date ?? gapiEvent.end.dateTime!),
    calendarId,
    recurrence:
      !gapiEvent.recurrence ||
      !gapiEvent.originalStartTime ||
      (!gapiEvent.originalStartTime.date && !gapiEvent.originalStartTime.dateTime)
        ? undefined
        : rruleToEventRrule(
            rrulestr(gapiEvent.recurrence.join('\n'), {
              dtstart: new Date(
                gapiEvent.originalStartTime.date ?? gapiEvent.originalStartTime.dateTime!,
              ),
            }),
          ),
    allDay: gapiEvent.start.date && gapiEvent.end.date ? true : false,
    bgColor:
      colors.event && gapiEvent.colorId
        ? colors.event[gapiEvent.colorId]?.background ?? bgColor
        : colors.calendar
        ? colors.calendar[calendarId]?.background ?? bgColor
        : bgColor,
    fgColor:
      colors.event && gapiEvent.colorId
        ? colors.event[gapiEvent.colorId]?.foreground ?? fgColor
        : colors.calendar
        ? colors.calendar[calendarId]?.foreground ?? fgColor
        : fgColor,
  };
};
