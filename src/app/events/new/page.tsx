'use client';

import { FC } from 'react';
import { EventEditor } from '../../../components/sections/EventEditor';
import { IEvent } from '../../../types/IEvent';

const Page: FC = () => {
  const now = new Date();
  const start = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
  );
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const event: IEvent = {
    id: 'new',
    summary: '',
    description: '',
    start,
    end,
    rrule: undefined,
    excludeDate: [],
    recurrenceId: start,
    created: now,
    updated: now,
  };
  return (
    <div>
      <EventEditor initialValue={event} />
    </div>
  );
};

export default Page;
