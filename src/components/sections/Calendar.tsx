import { FC } from 'react';
import { SECONDS_OF_A_DAY } from '../../utils/constants';
import { dateArray } from '../../utils/dateArray';
import { firstDayOfMonth } from '../../utils/firstDayOfMonth';
import { firstDayOfWeek } from '../../utils/firstDayOfWeek';
import { DateButton } from '../parts/DateButton';

interface CalendarProps {
  view: 'month' | `${number}weeks` | 'week';
  dateSelected: Date;
}

export const Calendar: FC<CalendarProps> = (props) => {
  const { view, dateSelected } = props;

  const start = firstDayOfWeek(firstDayOfMonth(dateSelected));

  const renderedWeeks = dateArray(start, 42, SECONDS_OF_A_DAY).map((date) => (
    <li key={date.getTime()}>
      <DateButton date={date} />
    </li>
  ));

  return <ul className='grid grid-cols-[repeat(7,minmax(0,1fr))]'>{renderedWeeks}</ul>;
};
