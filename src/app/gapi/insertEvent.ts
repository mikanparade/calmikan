import { IEvent } from '../types/IEvent';
import { fetchGapi } from './fetchGapi';
import { iEventToGapiEvent } from './iEventToGapiEvent';
/// <reference types='gapi.client.calendar-v3'>

export const insertEvent = async (
  event: IEvent & { id: string | undefined },
): Promise<gapi.client.calendar.Events> => {
  const { calendarId } = event;
  const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`);

  const body: gapi.client.calendar.Events = {
    items: [iEventToGapiEvent(event)],
  };
  const json = await fetchGapi<gapi.client.calendar.Events>(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return json;
};
