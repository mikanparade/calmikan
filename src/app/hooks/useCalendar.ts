import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { getCalendarList } from '../gapi/getCalendarList';
import { getEventListFactory } from '../gapi/getEventListFactory';
import { IEvent } from '../types/IEvent';
import { gapiEventToIEvent } from '../gapi/gapiEventToIEvent';
import { getColors } from '../gapi/getColors';
import { IMonthCalendar } from '../types/IMonthCalendar';
import { insertEvent } from '../gapi/insertEvent';

type TUseCalendar = (
  year: number,
  month: number,
) => {
  monthCalendar: IMonthCalendar;
  isLoading: boolean;
  isError: boolean;
  createEvent: (event: IEvent) => void;
  // updateEvent: (event: IEvent) => void;
  // deleteEvent: (eventId: string) => void;
};

export const useCalendar: TUseCalendar = (year, month) => {
  const gapiCalendarListResult = useQuery({
    queryKey: ['gapi', 'calendarList'],
    queryFn: getCalendarList,
  });

  const gapiColorListResult = useQuery({
    queryKey: ['gapi', 'colors'],
    queryFn: getColors,
  });

  const gapiEventListResults = useQueries({
    queries:
      gapiCalendarListResult.data
        ?.filter((entry) => entry.id)
        .map((entry) => ({
          queryFn: getEventListFactory(entry.id!),
          queryKey: ['gapi', 'events', entry.id],
        })) ?? [],
  });

  const createEvent = useMutation({
    mutationKey: ['gapi', 'events'],
    mutationFn: insertEvent,
    onSuccess: () => {
      gapiEventListResults.forEach((result) => result.refetch());
    },
  }).mutate;

  if (!gapiCalendarListResult.data || !gapiColorListResult.data) {
    return {
      isError: gapiEventListResults.some((result) => result.isError),
      isLoading: gapiEventListResults.some((result) => result.isLoading),
      monthCalendar: {
        events: [],
        leeways: [],
        year,
        month,
      },
      createEvent,
    };
  }

  const events = gapiEventListResults.reduce<IEvent[]>((list, result) => {
    const calendarId = result.data?.calendarId;
    if (!calendarId) return list;
    list.push(
      ...((
        result.data?.items?.map((event) =>
          gapiEventToIEvent(event, calendarId, gapiColorListResult.data),
        ) ?? []
      ).filter((value) => !!value) as IEvent[]),
    );
    return list;
  }, []);

  return {
    isError: gapiEventListResults.some((result) => result.isError),
    isLoading: gapiEventListResults.some((result) => result.isLoading),
    monthCalendar: {
      events,
      leeways: [],
      year,
      month,
    },
    createEvent,
  };
};
