import { FC, useState } from 'react';
import { useInputDatetimeLocal } from '../../hooks/useInputDatetimeLocal';
import { useInputText } from '../../hooks/useInputText';
import { IEvent } from '../../types/IEvent';
import { millisecondsToLocaleString } from '../../utils/millisecondsToLocaleString';
import { RRuleEditor } from './RRuleEditor';
import { Checkbox } from '../fundamentals/Checkbox';
import { useInputCheckboxOrRadio } from '../../hooks/useInputCheckboxOrRadio';

interface EventEditorProps {
  initialValue: IEvent;
  onChange: (newEvent: IEvent) => void;
}

export const EventEditor: FC<EventEditorProps> = (props) => {
  const { initialValue, onChange } = props;

  const start = useInputDatetimeLocal(initialValue.start);
  const end = useInputDatetimeLocal(initialValue.end);
  const isAllDay = useInputCheckboxOrRadio(false);
  const [rrule, setRRule] = useState(initialValue.rrule);
  const [excludeDate, setExcludeDate] = useState(initialValue.excludeDate);

  return (
    <div className='flex flex-col gap-4 p-4'>
      <label>
        <textarea
          className='w-full border border-gray-l-3 rounded-md'
          {...useInputText(initialValue.summary)}
        />
      </label>
      <p className='bg-leaf-l-1'>日付や時間は上の入力欄への入力によって簡単に設定できます</p>
      <dl className='flex flex-col'>
        <dt>開始日時</dt>
        <dd className='mb-4 ml-4'>
          <input
            type='datetime-local'
            className='w-full border border-gray-l-3 rounded-md'
            {...start}
          />
        </dd>
        <dt>終了日時</dt>
        <dd className='mb-4 ml-4 flex flex-col gap-1'>
          <Checkbox {...isAllDay}>終日</Checkbox>
          <input
            type='datetime-local'
            disabled={isAllDay.checked}
            className='w-full border border-gray-l-3 rounded-md disabled:opacity-50'
            {...end}
          />
        </dd>
        <dt>長さ</dt>
        <dd className='mb-4 ml-4'>
          {millisecondsToLocaleString(end.date.getTime() - start.date.getTime())}
        </dd>
        <dt>繰り返し</dt>
        <dd className='mb-4 ml-4'>
          <RRuleEditor initialValue={rrule} onChange={setRRule} />
        </dd>
      </dl>
      <button>保存</button>
    </div>
  );
};
