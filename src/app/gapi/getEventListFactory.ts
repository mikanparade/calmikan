import { fetchGapi } from './fetchGapi';
/// <reference types='gapi.client.calendar-v3'>

export const getEventListFactory =
  (calendarId: string) =>
  async (): Promise<{ items: gapi.client.calendar.Events['items']; calendarId: string }> => {
    type Body = gapi.client.calendar.CalendarList;
    const createNewUrl = (calendarId: string) =>
      new URL(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`);

    const joinedList: NonNullable<Body['items']> = [];

    let json = await fetchGapi<Body>(createNewUrl(calendarId));
    joinedList.push(...(json.items ?? []));

    while (json.nextPageToken) {
      const urlWithParam = createNewUrl(calendarId);
      urlWithParam.searchParams.set('pageToken', json.nextPageToken);
      json = await fetchGapi<Body>(urlWithParam);
      joinedList.push(...(json.items ?? []));
    }

    return { items: joinedList, calendarId };
  };
