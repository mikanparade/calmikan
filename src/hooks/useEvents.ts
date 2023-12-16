import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchJson } from '../utils/fetchJson';
import { isTypedArray } from '../utils/isTypedArray';
import { eventFromEventSerialized, isIEventSerialized } from '../types/IEventSerialized';
import { IEvent } from '../types/IEvent';
import { queryClient } from '../utils/queryClient';

class InvalidEventsError extends Error {
  public readonly name = 'InvalidEventsError';
}

interface IUseEventsParams {
  calendarIds: string[];
}

interface IUseEvents {
  isLoading: boolean;
  isError: boolean;
  data: IEvent[];
  setData: (data: IEvent[]) => void;
  error: Error | undefined;
}

const fetchEventInCalendar = async (calendarId: string): Promise<IEvent[]> => {
  const response = localStorage.getItem(calendarId);
  let events: IEvent[] = [];
  if (response) {
    events = JSON.parse(response);
  }

  if (!isTypedArray(events, isIEventSerialized)) {
    throw new InvalidEventsError();
  }
  return events.map(eventFromEventSerialized);
};

const f  = (params: IUseEventsParams): IUseEvents => {
  const data = params.calendarIds.map(fetchEventInCalendar);
// こんなのりでもいいきがする
// LGTM。これで行きましょう
  const setData = (events: IEvent[]) => {
  };

  return { isLoading: false, isError: false, data, setData, error: undefined };
}

export const useEvents = (params: IUseEventsParams): IUseEvents => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['events'],
    initialData: [],
    queryFn: async () => (await Promise.all(params.calendarIds.map(fetchEventInCalendar))).flat(),
  });

  const mutation = useMutation({
    mutationKey: ['events'],
    mutationFn: async (events: IEvent[]) => {
      params.calendarIds.forEach((calendarId) => {
        const calendarEvents = events.filter((event) => event.calendarId === calendarId);
        localStorage.setItem(calendarId, JSON.stringify(calendarEvents));
      });

      // idが「new」のやつが入っていたら採番すること
      return events;
    },
    onSuccess: (events) => {
      queryClient.setQueryData(['events'], () => events);
    },
  });

  const setData = (events: IEvent[]) => {
    mutation.mutate(events);
  };

  return { isLoading, isError, data, setData, error: error ?? undefined };
};
