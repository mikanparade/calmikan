import { SECONDS_OF_A_DAY } from './constants';

export const firstDayOfWeek = (date: Date) =>
  new Date(date.getTime() - date.getDay() * SECONDS_OF_A_DAY);
