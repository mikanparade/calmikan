import { cdate } from 'cdate';

export const dateToLocaleString = (date: Date, full = false, today = new Date()) => {
  if (full || today.getMonth() !== date.getMonth()) {
    return cdate(date).format('YYYY年MM月DD日(ddd)');
  }
  return cdate(date).format('MM月DD日(ddd)');
};
