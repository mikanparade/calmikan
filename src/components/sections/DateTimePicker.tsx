import { FC } from 'react';
import { firstDayOfWeek } from '../../utils/firstDayOfWeek';
import { firstDayOfMonth } from '../../utils/firstDayOfMonth';
import { dateArray } from '../../utils/dateArray';
import { SECONDS_OF_A_DAY } from '../../utils/constants';

interface DateTimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export const DateTimePicker: FC<DateTimePickerProps> = (props) => {
  const { value, onChange } = props;
  return (
    <div>
      <div>
        <button>
          <span className='icon-outlined'>navigate_before</span>
        </button>
        <button>
          <span className='icon-outlined'>navigate_next</span>
        </button>
      </div>
      <ul className='grid grid-cols-[repeat(7,minmax(0,1fr))]'>
        {dateArray(firstDayOfWeek(firstDayOfMonth(value)), 42, SECONDS_OF_A_DAY).map((date) => (
          <li key={date.getTime()}>
            <button>{date.getDate()}</button>
          </li>
        ))}
      </ul>
      <div className='flex flex-row'>
        <input
          type='datetime-local'
          value={new Date(value.getTime() - value.getTimezoneOffset() * 60 * 1000)
            .toISOString()
            .substring(0, 16)}
          onChange={(e) => onChange(new Date(e.currentTarget.value))}
        />
      </div>
    </div>
  );
};
