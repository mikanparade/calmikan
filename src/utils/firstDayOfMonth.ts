import { SECONDS_OF_A_DAY } from './constants';

export const firstDayOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);
