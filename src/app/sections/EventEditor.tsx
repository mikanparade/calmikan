'use client';

import { get } from 'http';
import { useState } from 'react';

const daysInJapanese = ['日', '月', '火', '水', '木', '金', '土'];

const AddEvent: React.FC = () => {
  const [title, setTitle] = useState('');
  const [includeNumsInTitle, setIncludeNumsInTitle] = useState<number[] | null>(null);
  const [includeRepeatInTitle, setincludeRepeatInTitle] = useState<string[] | null>(null);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState<Date>(date);
  const [endTime, setEndTime] = useState<Date>(new Date(date.getTime() + 60 * 60 * 1000));
  const [eventMode, setEventMode] = useState('timed');
  const [repeatType, setRepeatType] = useState('none'); // 'none', 'daily', 'weekly', 'monthly'
  const [repeatOn, setRepeatOn] = useState<{ [key: string]: boolean }>({
    Sun: false,
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
  });
  const [repeatEndDate, setRepeatEndDate] = useState<Date>(
    new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000),
  );
  const [repeatEndOption, setRepeatEndOption] = useState<'none' | 'date'>('none');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setDate(newDate);
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = new Date(date);
    const [hours, minutes] = e.target.value.split(':').map(Number);
    newTime.setHours(hours, minutes);
    setStartTime(newTime);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = new Date(date);
    const [hours, minutes] = e.target.value.split(':').map(Number);
    newTime.setHours(hours, minutes);
    setEndTime(newTime);
  };

  const isAllDayEvent = (): boolean => {
    if (!startTime || !endTime) return false;
    return (
      startTime.getHours() === 0 &&
      startTime.getMinutes() === 0 &&
      endTime.getHours() === 23 &&
      endTime.getMinutes() === 59
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allDay = isAllDayEvent();
    // データベースまたはAPIへの送信ロジックをここに記述
    console.log({
      title,
      date,
      description,
      isAllDay: allDay,
      startTime,
      endTime,
    });
  };

  const handleRepeatOnToggle = (day: string) => {
    setRepeatOn((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const handleRepeatEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatEndDate(new Date(e.target.value));
  };

  const extractFourDigitNumbers = (input: string): number[] | null => {
    const regex = /\b\d{4}\b/g;
    const matches = input.match(regex) || null;
    return matches?.map((match) => parseInt(match, 10)) ?? null;
  };

  const removeSpecifiedFourDigitNumber = (input: string, numberToRemove: Number): string => {
    const regex = new RegExp(`\\b${numberToRemove}\\b`, 'g');
    return input.replace(regex, '');
  };

  const findTimeKeyword = (input: string): string[] => {
    const keywords = ['毎日', '毎週', '毎月'];
    return keywords.filter((keyword) => input.includes(keyword));
  };

  const getDateFromFourDigitNumber = (number: number): Date => {
    const month = Math.floor(number / 100);
    const d = number % 100;
    return new Date(date.getFullYear(), month - 1, d);
  };

  const getDateStringFromFourDigitNumber = (number: number): string => {
    const d = getDateFromFourDigitNumber(number);
    return `${(d.getMonth() + 1).toString().padStart(2, '0')}月${d
      .getDate()
      .toString()
      .padStart(2, '0')}日 (${daysInJapanese[d.getDay()]})`;
  };

  const getTimeFromFourDigitNumber = (number: number, date: Date): Date => {
    const hours = Math.floor(number / 100);
    const minutes = number % 100;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);
  };

  const getTimeStringFromFourDigitNumber = (number: number, date: Date): string => {
    const d = getTimeFromFourDigitNumber(number, date);
    return `${d.getHours().toString().padStart(2, '0')}:${d
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  };

  const validateDate = (number: number): boolean => {
    const month = Math.floor(number / 100);
    const d = number % 100;
    return month >= 1 && month <= 12 && d >= 1 && d <= 31;
  };

  const validateTime = (number: number): boolean => {
    const hours = Math.floor(number / 100);
    const minutes = number % 100;
    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
  };

  return (
    <div className="container mx-auto p-4 h-full">
      <div className="rounded-md max-w-xl mx-auto mt-10 p-4 bg-white shadow-md rounded">
        <div className="flex">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            戻る
          </button>
          <h1 className="text-2xl font-semibold mb-4">新しい予定の作成</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="title"
              placeholder="名前、日付、時間、……"
              className="w-full p-2 border rounded"
              value={title}
              onChange={(e) => {
                const title = e.target.value;
                setTitle(title);
                setIncludeNumsInTitle(extractFourDigitNumbers(title));
                setincludeRepeatInTitle(findTimeKeyword(title));
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="date">
              日付や時間は上の入力欄への入力によって簡単に設定できます
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="date">
              日時
            </label>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <label>{`${(date.getMonth() + 1).toString().padStart(2, '0')}月${date
                  .getDate()
                  .toString()
                  .padStart(2, '0')}日 (${daysInJapanese[date.getDay()]})`}</label>
                {/* <input
                            type="date"
                            id="date"
                            className="w-full p-2 border rounded"
                            value={date.toISOString().split("T")[0]}
                            onChange={handleDateChange}
                        /> */}
                <button>変更</button>
              </div>
              {includeNumsInTitle && validateDate(includeNumsInTitle[0]) && (
                <button
                  onClick={() => {
                    const newTitle = removeSpecifiedFourDigitNumber(title, includeNumsInTitle[0]);
                    setTitle(newTitle);
                    setIncludeNumsInTitle(extractFourDigitNumbers(newTitle));
                    setDate(getDateFromFourDigitNumber(includeNumsInTitle[0]));
                    setStartTime(getDateFromFourDigitNumber(includeNumsInTitle[0]));
                  }}
                >
                  {`${getDateStringFromFourDigitNumber(includeNumsInTitle[0])}開始`}
                </button>
              )}
            </div>
            <div className="flex flex-row items-start">
              <label className="">
                <input
                  type="radio"
                  name="eventMode"
                  value="allDay"
                  checked={eventMode === 'allDay'}
                  onChange={() => setEventMode('allDay')}
                  className="mr-1"
                />
                終日
              </label>
              <div className="flex justify-between">
                <label className="">
                  <input
                    type="radio"
                    name="eventMode"
                    value="timed"
                    checked={eventMode === 'timed'}
                    onChange={() => setEventMode('timed')}
                    className="mr-1"
                  />
                  {`${startTime.getHours().toString().padStart(2, '0')}:${startTime
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')}-${endTime.getHours().toString().padStart(2, '0')}:${endTime
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')} (${
                    (endTime?.getTime() - startTime.getTime()) / 1000 / 60
                  }分)`}
                </label>
                <button>変更</button>
              </div>
            </div>
            <div>
              {includeNumsInTitle && validateTime(includeNumsInTitle[0]) && (
                <button
                  onClick={() => {
                    const newTitle = removeSpecifiedFourDigitNumber(title, includeNumsInTitle[0]);
                    setTitle(newTitle);
                    setIncludeNumsInTitle(extractFourDigitNumbers(newTitle));
                    setDate(getTimeFromFourDigitNumber(includeNumsInTitle[0], date));
                    setStartTime(getTimeFromFourDigitNumber(includeNumsInTitle[0], startTime));
                  }}
                >
                  {`${getTimeStringFromFourDigitNumber(includeNumsInTitle[0], date)}開始`}
                </button>
              )}
              {includeNumsInTitle && validateTime(includeNumsInTitle[0]) && (
                <button
                  onClick={() => {
                    const newTitle = removeSpecifiedFourDigitNumber(title, includeNumsInTitle[0]);
                    setTitle(newTitle);
                    setIncludeNumsInTitle(extractFourDigitNumbers(newTitle));
                    setEndTime(getTimeFromFourDigitNumber(includeNumsInTitle[0], endTime));
                  }}
                >
                  {`${getTimeStringFromFourDigitNumber(includeNumsInTitle[0], date)}終了`}
                </button>
              )}
            </div>
          </div>
          <div className="mb-4">
            <span className="block text-sm font-medium mb-2">繰り返し</span>
            <div>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="repeatType"
                    value="none"
                    checked={repeatType === 'none'}
                    onChange={() => setRepeatType('none')}
                    className="mr-1"
                  />
                  なし
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="repeatType"
                    value="daily"
                    checked={repeatType === 'daily'}
                    onChange={() => setRepeatType('daily')}
                    className="mr-1"
                  />
                  毎日
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="repeatType"
                    value="weekly"
                    checked={repeatType === 'weekly'}
                    onChange={() => setRepeatType('weekly')}
                    className="mr-1"
                  />
                  毎週
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="repeatType"
                    value="monthly"
                    checked={repeatType === 'monthly'}
                    onChange={() => setRepeatType('monthly')}
                    className="mr-1"
                  />
                  毎月
                </label>
              </div>
              {includeRepeatInTitle && (
                <button
                  onClick={() => {
                    const newTitle = title.replace(includeRepeatInTitle[0], '');
                    setTitle(newTitle);
                    setincludeRepeatInTitle(findTimeKeyword(newTitle));
                    switch (includeRepeatInTitle[0]) {
                      case '毎日':
                        setRepeatType('daily');
                        break;
                      case '毎週':
                        setRepeatType('weekly');
                        break;
                      case '毎月':
                        setRepeatType('monthly');
                        break;
                    }
                  }}
                >
                  {includeRepeatInTitle[0]}
                </button>
              )}
            </div>
          </div>
          <div className="mb-4">
            <span className="block text-sm font-medium mb-2">繰り返しの終了</span>
            <div className="space-y-2">
              <label className="block">
                <input
                  type="radio"
                  name="repeatEndOption"
                  value="none"
                  checked={repeatEndOption === 'none'}
                  onChange={() => setRepeatEndOption('none')}
                />
                なし
              </label>
              <div className="flex justify-between">
                <label className="">
                  <input
                    type="radio"
                    name="repeatEndOption"
                    value="date"
                    checked={repeatEndOption === 'date'}
                    onChange={() => setRepeatEndOption('date')}
                  />
                  {`${(repeatEndDate.getMonth() + 1).toString().padStart(2, '0')}月${repeatEndDate
                    .getDate()
                    .toString()
                    .padStart(2, '0')}日 (${daysInJapanese[repeatEndDate.getDay()]}) (${
                    (repeatEndDate.getTime() - startTime.getTime()) / 1000 / 60 / 60 / 24
                  }日後)`}
                </label>
                <button>変更</button>
              </div>
              {/* {repeatEndOption === 'date' && (
                <div className="mt-2">
                  <input
                    type="date"
                    className="w-full p-2 border rounded"
                    value={repeatEndDate ? repeatEndDate.toISOString().split("T")[0] : ""}
                    onChange={handleRepeatEndDateChange}
                  />
                </div>
              )} */}
            </div>

            {includeNumsInTitle && validateDate(includeNumsInTitle[0]) && (
              <button
                onClick={() => {
                  const newTitle = removeSpecifiedFourDigitNumber(title, includeNumsInTitle[0]);
                  setTitle(newTitle);
                  setIncludeNumsInTitle(extractFourDigitNumbers(newTitle));
                  setRepeatEndOption('date');
                  setRepeatEndDate(getDateFromFourDigitNumber(includeNumsInTitle[0]));
                }}
              >
                {getDateStringFromFourDigitNumber(includeNumsInTitle[0])}
              </button>
            )}
          </div>
          <div className="mb-4">
            <div className="flex justyfy-between">
              <div className="flex flex-col">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  キャンセル
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
