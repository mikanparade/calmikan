import { cdate } from 'cdate';

export const timeToLocaleString = (date: Date, full = false, today = new Date()) => {
  if (full || today.getMonth() !== date.getMonth()) {
    return cdate(date).format('YYYY年MM月DD日(ddd) HH:mm');
  }
  if (today.getDate() !== date.getDate()) {
    return cdate(date).format('MM月DD日(ddd) HH:mm');
  }
  return cdate(date).format('HH:mm');
};
