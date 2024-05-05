import { ExtendedFeatureCollection } from 'd3-geo';
import { requests } from '../requestUtil';

export const loadEventsData = async (): Promise<ExtendedFeatureCollection> => {
  return await requests<ExtendedFeatureCollection>(
    '/data/events.json'
  );
};
