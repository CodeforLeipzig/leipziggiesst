import { ExtendedFeature, ExtendedFeatureCollection, GeoGeometryObjects } from 'd3';
import { SelectedEventType } from '../../common/interfaces';


export const getEventData = async (
  id: string,
  waterSourcesGeoJson: ExtendedFeatureCollection<ExtendedFeature<GeoGeometryObjects | null, GeoJSON.GeoJsonProperties>> | null,
): Promise<{
  selectedEventData: SelectedEventType | undefined;
}> => {

  const feature = waterSourcesGeoJson?.features.find(feature => feature.properties?.id === id)

  if (!feature) {
    return {
      selectedEventData: undefined
    }
  }

  return {
    selectedEventData: {
      ...feature.properties,
      id: "" + feature?.properties?.id,
      latitude: (feature?.geometry as GeoJSON.Point)?.coordinates[1],
      longitude: (feature?.geometry as GeoJSON.Point)?.coordinates[0]
    }
  };
};
