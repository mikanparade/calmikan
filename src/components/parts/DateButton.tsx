import { FC } from 'react';

interface DateButtonProps {
  date: Date;
}

export const DateButton: FC<DateButtonProps> = (props) => (
  <a>
    {props.date.getDate() === 1 && `${props.date.getFullYear()}年${props.date.getMonth() + 1}月`}
    <span>{props.date.getDate()}</span>
  </a>
);
