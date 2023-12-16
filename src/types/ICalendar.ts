export interface ICalendar {
  id: string;
  name: string;
  color: string;
}

export const isICalendar = (v: unknown): v is ICalendar => {
  if (typeof v !== 'object' || v === null) {
    return false;
  }
  return [
    'id' in v && typeof v.id === 'string',
    'name' in v && typeof v.name === 'string',
    'color' in v && typeof v.color === 'string',
  ].every((condition) => condition);
};
