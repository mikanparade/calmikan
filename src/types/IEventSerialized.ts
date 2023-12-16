import { RRule } from 'rrule';
import { isTypedArray } from '../utils/isTypedArray';
import { IEvent } from './IEvent';

export type IEventSerialized = {
  [k in keyof IEvent]: IEvent[k] extends object[]
    ? string[]
    : IEvent[k] extends object
      ? string
      : IEvent[k] extends object | undefined
        ? string | undefined
        : IEvent[k];
};

export const isIEventSerialized = (v: unknown): v is IEventSerialized => {
  if (typeof v !== 'object' || v === null) {
    return false;
  }
  new RRule();
  return [
    'id' in v && typeof v.id === 'string',
    'summary' in v && typeof v.summary === 'string',
    'description' in v && v.description === 'string',
    'start' in v && v.start === 'string',
    'end' in v && v.end === 'string',
    !('rrule' in v) || typeof v.rrule === 'string',
    'excludeDate' in v && isTypedArray(v.excludeDate, (w): w is string => typeof w === 'string'),
    'created' in v && typeof v.created === 'string',
    'updated' in v && typeof v.updated === 'string',
    'recurrenceId' in v && typeof v.recurrenceId === 'string',
  ].every((condition) => condition);
};

export const eventFromEventSerialized = (eventSerialized: IEventSerialized): IEvent => {
  return {
    id: eventSerialized.id,
    summary: eventSerialized.summary,
    description: eventSerialized.description,
    start: new Date(eventSerialized.start),
    end: new Date(eventSerialized.end),
    rrule: eventSerialized.rrule ? RRule.fromString(eventSerialized.rrule) : RRule.fromString(''),
    excludeDate: eventSerialized.excludeDate.map((s) => new Date(s)),
    created: new Date(eventSerialized.created),
    updated: new Date(eventSerialized.updated),
    recurrenceId: new Date(eventSerialized.recurrenceId),
  };
};
