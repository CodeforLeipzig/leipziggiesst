import { QueryFunction, useQuery } from 'react-query';
import { ExtendedFeatureCollection } from 'd3-geo';
import { loadEventsData } from '../requests/loadEventsData';

const loadData: QueryFunction = async (): Promise<ExtendedFeatureCollection> => {
  return await loadEventsData();
};

export const useEventsGeoJson = (): {
  data: ExtendedFeatureCollection | null;
  error: Error | null;
} => {
  const dataParams = 'events-geojson';
  const { data, error } = useQuery<unknown, Error, ExtendedFeatureCollection>(
    dataParams,
    loadData,
    { staleTime: Infinity }
  );

  return {
    data: data || null,
    error: error || null,
  };
};
