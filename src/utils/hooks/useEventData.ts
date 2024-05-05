import { QueryFunction, useQuery, useQueryClient } from 'react-query';
import { SelectedEventType } from '../../common/interfaces';
import { getEventData } from '../requests/getEventData';
import { useEventsGeoJson } from '../../utils/hooks/useEventsGeoJson';

const loadEvent: QueryFunction<SelectedEventType | undefined> = async ({
  queryKey,
}) => {
  const [, eventId, events] = queryKey;
  if (!eventId) return undefined;
  const data = await getEventData(eventId, events);
  if (!data.selectedEventData) {
    throw new Error('Gießevent nicht gefunden. Probiere ein anderes ...');
  }
  return data.selectedEventData;
};

export const useEventData = (
  eventId: string | undefined | null
): {
  eventData: SelectedEventType | undefined;
  error: Error | null;
  invalidate: () => void;
} => {
  const queryClient = useQueryClient();

  const eventDataParams = [`event-${eventId}`, eventId, useEventsGeoJson().data];
  const { data: eventData, error } = useQuery<
    SelectedEventType | undefined,
    Error
  >(eventDataParams, loadEvent, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return {
    eventData,
    error,
    invalidate: () => {
      queryClient.invalidateQueries(eventDataParams);
    },
  };
};
