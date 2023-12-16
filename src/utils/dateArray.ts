import { SECONDS_OF_A_DAY } from './constants';

export const dateArray = (start: Date, length: number, step = SECONDS_OF_A_DAY): Date[] => {
  const dates = [];

  for (let i = 0; i < length; i += 1) {
    dates.push(new Date(start.getTime() + i * step));
  }

  return dates;
};
