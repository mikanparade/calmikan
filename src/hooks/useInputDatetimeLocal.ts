import { ChangeEventHandler, useState } from 'react';

interface IUseInputDatetimeLocal {
  date: Date;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const useInputDatetimeLocal = (initialValue: Date): IUseInputDatetimeLocal => {
  const [date, setDate] = useState(initialValue);
  const value = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
    .toISOString()
    .substring(0, 16);
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setDate(new Date(event.currentTarget.value));
  };
  return { date, value, onChange };
};
