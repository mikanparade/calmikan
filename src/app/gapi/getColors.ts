import { fetchGapi } from './fetchGapi';
/// <reference types='gapi.client.calendar-v3'>

export const getColors = async (): Promise<gapi.client.calendar.Colors> => {
  type Body = gapi.client.calendar.Colors;
  const createNewUrl = () => new URL(`https://www.googleapis.com/calendar/v3/colors`);

  const json = await fetchGapi<Body>(createNewUrl());

  return json;
};
