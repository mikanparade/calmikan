import { fetchGapi } from './fetchGapi';
/// <reference types='gapi.client.calendar-v3'>

export const getCalendarList = async (): Promise<gapi.client.calendar.CalendarList['items']> => {
  type Body = gapi.client.calendar.CalendarList;
  const createNewUrl = () =>
    new URL('https://www.googleapis.com/calendar/v3/users/me/calendarList');

  const joinedList: NonNullable<Body['items']> = [];

  let json = await fetchGapi<Body>(createNewUrl());
  joinedList.push(...(json.items ?? []));

  while (json.nextPageToken) {
    const urlWithParam = createNewUrl();
    urlWithParam.searchParams.set('pageToken', json.nextPageToken);
    json = await fetchGapi<Body>(urlWithParam);
    joinedList.push(...(json.items ?? []));
  }

  return joinedList;
};
