import { FC, useState } from 'react';
import { useInputDatetimeLocal } from '../../hooks/useInputDatetimeLocal';
import { useInputText } from '../../hooks/useInputText';
import { IEvent } from '../../types/IEvent';
import { millisecondsToLocaleString } from '../../utils/millisecondsToLocaleString';
import { RRuleEditor } from './RRuleEditor';

interface EventEditorProps {
  initialValue: IEvent;
  onChange: (newEvent: IEvent) => void;
}

export const EventEditor: FC<EventEditorProps> = (props) => {
  const { initialValue, onChange } = props;

  const start = useInputDatetimeLocal(initialValue.start);
  const end = useInputDatetimeLocal(initialValue.end);
  const [rrule, setRRule] = useState(initialValue.rrule);
  const [excludeDate, setExcludeDate] = useState(initialValue.excludeDate);

  return (
    <div>
      <label>
        <textarea {...useInputText(initialValue.summary)} />
      </label>
      <p>日付や時間は上の入力欄への入力によって簡単に設定できます</p>
      <dl>
        <dt>開始日時</dt>
        <dd>
          <input type='datetime-local' {...start} />
        </dd>
        <dt>終了日時</dt>
        <dd>
          <label>
            <input type='checkbox' />
            終日
          </label>
          <input type='datetime-local' {...end} />
        </dd>
        <dt>長さ</dt>
        <dd>{millisecondsToLocaleString(end.date.getTime() - start.date.getTime())}</dd>
        <dt>繰り返し</dt>
        <dd>
          <RRuleEditor initialValue={rrule} onChange={setRRule} />
        </dd>
      </dl>
      <button>保存</button>
    </div>
  );
};
