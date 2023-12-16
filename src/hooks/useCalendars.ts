import { useMutation, useQuery } from '@tanstack/react-query';
import { ICalendar, isICalendar } from '../types/ICalendar';
import { isTypedArray } from '../utils/isTypedArray';
import { queryClient } from '../utils/queryClient';

interface IUseCalendars {
  isLoading: boolean;
  isError: boolean;
  data: ICalendar[];
  setData: (data: ICalendar[]) => void;
  error: Error | undefined;
}

class InvalidCalendarsError extends Error {
  public readonly name = 'InvalidCalendarsError';
}

export const useCalendars = (): IUseCalendars => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['calendars'],
    initialData: [],
    queryFn: async (): Promise<ICalendar[]> => {
      const response = localStorage.getItem('calendars');
      
      let calendars: ICalendar[] = [];
      if (response) {
        calendars = JSON.parse(response);
      }

      // Check the type of the loaded data
      if (!isTypedArray(calendars, isICalendar)) {
        throw new InvalidCalendarsError();
      }
      return calendars;
    },
  });

  const mutation = useMutation({
    mutationKey: ['calendars'],
    mutationFn: async (calendars: ICalendar[]) => {
      // TODO: localstorageに書き込み
      // IDが「new」になっているやつは新しいやつなので採番すること
      return calendars;
    },
    onSuccess: (calendars) => {
      queryClient.setQueryData(['calendars'], () => calendars);
    },
  });

  const setData = (calendars: ICalendar[]) => {
    mutation.mutate(calendars);
  };

  return { isLoading, isError, data, setData, error: error ?? undefined };
};

