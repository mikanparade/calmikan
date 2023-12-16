import { FC } from 'react';
import { Frequency, RRule } from 'rrule';
import { useCheckboxes } from '../../hooks/useCheckboxes';
import { useInputDatetimeLocal } from '../../hooks/useInputDatetimeLocal';
import { useInputText } from '../../hooks/useInputText';
import { useRadios } from '../../hooks/useRadios';
import { Checkbox } from '../fundamentals/Checkbox';
import { Radio } from '../fundamentals/Radio';

interface RRuleEditorProps {
  initialValue: RRule | undefined;
  onChange: (rrule: RRule) => void;
}

export const RRuleEditor: FC<RRuleEditorProps> = (props) => {
  const { initialValue, onChange } = props;

  const freq = useRadios({
    selected: initialValue?.options.freq ?? 9,
    selections: [
      { value: 9, label: 'なし' },
      { value: Frequency.DAILY, label: '毎日' },
      { value: Frequency.WEEKLY, label: '毎週' },
      { value: Frequency.MONTHLY, label: '毎月' },
      { value: Frequency.YEARLY, label: '毎年' },
    ],
  });
  const interval = useInputText(initialValue?.options.interval.toString() ?? '');
  const byweekday = useCheckboxes({
    selected: initialValue?.options.byweekday ?? [],
    selections: [
      { value: 6, label: '日' },
      { value: 0, label: '月' },
      { value: 1, label: '火' },
      { value: 2, label: '水' },
      { value: 3, label: '木' },
      { value: 4, label: '金' },
      { value: 5, label: '土' },
    ],
  });
  const bymonth = useCheckboxes({
    selected: initialValue?.options.bymonth ?? [],
    selections: [
      { value: 1, label: '1月' },
      { value: 2, label: '2月' },
      { value: 3, label: '3月' },
      { value: 4, label: '4月' },
      { value: 5, label: '5月' },
      { value: 6, label: '6月' },
      { value: 7, label: '7月' },
      { value: 8, label: '8月' },
      { value: 9, label: '9月' },
      { value: 10, label: '10月' },
      { value: 11, label: '11月' },
      { value: 12, label: '12月' },
    ],
  });
  const bysetposString = useInputText(initialValue?.options.bysetpos.join(',') ?? '');
  const bymonthdayString = useInputText(initialValue?.options.bymonthday.join(',') ?? '');
  const byyeardayString = useInputText(initialValue?.options.byyearday.join(',') ?? '');
  const byweeknoString = useInputText(initialValue?.options.byweekno.join(',') ?? '');
  const recurrenceEnd = useRadios({
    selected: 'none',
    selections: [
      { value: 'none', label: '無期限' },
      { value: 'until', label: '終了日時を設定' },
      { value: 'count', label: '繰り返し回数を設定' },
    ],
  });
  const until = useInputDatetimeLocal(initialValue?.options.until ?? new Date());
  const countString = useInputText(initialValue?.options.count?.toString() ?? '');

  const intervalLabel = {
    [9]: '',
    [Frequency.SECONDLY]: '秒',
    [Frequency.MINUTELY]: '分',
    [Frequency.HOURLY]: '時',
    [Frequency.DAILY]: '日',
    [Frequency.WEEKLY]: '週',
    [Frequency.MONTHLY]: 'か月',
    [Frequency.YEARLY]: '年',
  }[freq.value];

  const bysetposLabel = {
    [9]: '',
    [Frequency.SECONDLY]: '毎秒',
    [Frequency.MINUTELY]: '毎分',
    [Frequency.HOURLY]: '毎時',
    [Frequency.DAILY]: '毎日',
    [Frequency.WEEKLY]: '毎週第',
    [Frequency.MONTHLY]: '毎月第',
    [Frequency.YEARLY]: '毎年第',
  }[freq.value];

  return (
    <dl className='flex flex-col'>
      <dt>繰り返しの種類</dt>
      <dd className='mb-4 ml-4 flex flex-row gap-1'>
        {freq.props.map((props) => (
          <Radio key={props.value} checked={props.checked} onChange={props.onChange}>
            {props.label}
          </Radio>
        ))}
      </dd>
      {freq.value !== 9 && (
        <>
          <dt>繰り返しの頻度</dt>
          <dd className='mb-4 ml-4 flex flex-row'>
            <input step={1} min={1} type='number' className='w-full' {...interval} />
            <span className='flex-shrink-0'>{intervalLabel}に1回</span>
          </dd>
        </>
      )}
      {[Frequency.YEARLY, Frequency.MONTHLY, Frequency.WEEKLY].includes(freq.value) && (
        <>
          <dt>繰り返す曜日</dt>
          <dd className='mb-4 ml-4 flex flex-row gap-1'>
            {byweekday.props.map((props) => (
              <Checkbox key={props.value} checked={props.checked} onChange={props.onChange}>
                {props.label}
              </Checkbox>
            ))}
          </dd>
        </>
      )}
      {freq.value === Frequency.YEARLY && (
        <>
          <dt>繰り返す月</dt>
          <dd className='mb-4 ml-4 grid grid-cols-6 gap-1'>
            {bymonth.props.map((props) => (
              <Checkbox key={props.value} checked={props.checked} onChange={props.onChange}>
                {props.label}
              </Checkbox>
            ))}
          </dd>
        </>
      )}
      {[Frequency.YEARLY, Frequency.MONTHLY, Frequency.WEEKLY].includes(freq.value) && (
        <>
          <dt>繰り返す日の限定</dt>
          <dd className='mb-4 ml-4'>
            {bysetposLabel}
            <input
              type='text'
              {...bysetposString}
              placeholder={`カンマ区切りで入力・空の場合は${bysetposLabel}繰り返す`}
            />
            番目に限定
          </dd>
        </>
      )}
      {freq.value === Frequency.MONTHLY && (
        <>
          <dt>繰り返す日</dt>
          <dd className='mb-4 ml-4'>
            毎月
            <input type='text' {...bymonthdayString} placeholder='カンマ区切りで入力' />日
          </dd>
        </>
      )}
      {freq.value === Frequency.YEARLY && (
        <>
          <dt>繰り返す日</dt>
          <dd className='mb-4 ml-4'>
            毎年
            <input type='text' {...byyeardayString} placeholder='カンマ区切りで入力' />日
          </dd>
        </>
      )}
      {freq.value === Frequency.YEARLY && (
        <>
          <dt>繰り返す週</dt>
          <dd className='mb-4 ml-4'>
            毎年第
            <input type='text' {...byweeknoString} placeholder='カンマ区切りで入力' />週
          </dd>
        </>
      )}
      {freq.value !== 9 && (
        <>
          <dt>繰り返しの終了</dt>
          <dd className='mb-4 ml-4 flex flex-row gap-1'>
            {recurrenceEnd.props.map((props) => (
              <Radio key={props.value} checked={props.checked} onChange={props.onChange}>
                {props.label}
              </Radio>
            ))}
          </dd>
          {recurrenceEnd.value === 'until' && (
            <>
              <dt>繰り返しの終了日</dt>
              <dd className='mb-4 ml-4'>
                <input type='datetime-local' {...until} />
              </dd>
            </>
          )}
          {recurrenceEnd.value === 'count' && (
            <>
              <dt>繰り返す回数</dt>
              <dd className='mb-4 ml-4'>
                <input type='number' {...countString} />回
              </dd>
            </>
          )}
        </>
      )}
    </dl>
  );
};
