import React, { FC, useRef, useCallback, useState } from 'react';
import { isMobile } from 'react-device-detect';
import debounce from 'lodash.debounce';
import DeckGlMap from './DeckGLMap';
import { useStoreState } from '../../state/unistore-hooks';
import { useTreeData } from '../../utils/hooks/useTreeData';
import { useWaterSourceData } from '../../utils/hooks/useWaterSourceData';
import { useEventData } from '../../utils/hooks/useEventData';
import { useHistory } from 'react-router';
import { useCurrentTreeId } from '../../utils/hooks/useCurrentTreeId';
import { useCurrentWaterSourceId } from '../../utils/hooks/useCurrentWaterSourceId';
import { useCurrentEventId } from '../../utils/hooks/useCurrentEventId';
import { useCommunityData } from '../../utils/hooks/useCommunityData';
import { useRainGeoJson } from '../../utils/hooks/useRainGeoJson';
import { usePumpsGeoJson } from '../../utils/hooks/usePumpsGeoJson';
import { useWaterSourcesGeoJson } from '../../utils/hooks/useWaterSourcesGeoJson';
import { useEventsGeoJson } from '../../utils/hooks/useEventsGeoJson';
import { useWoodsGeoJson } from '../../utils/hooks/useWoodsGeoJson';
import { useTreesGeoJson } from '../../utils/hooks/useTreesGeoJson';

export const Map: FC<{
  showOverlay: boolean | undefined;
  isNavOpened: boolean | undefined;
}> = ({ showOverlay, isNavOpened }) => {
  const mapRef = useRef(null);
  const deckRef = useRef(null);
  const visibleMapLayer = useStoreState('visibleMapLayer');
  const ageRange = useStoreState('ageRange');
  const mapViewFilter = useStoreState('mapViewFilter');
  const mapFocusPoint = useStoreState('mapFocusPoint');

  const treeId = useCurrentTreeId();
  const waterSourceId = useCurrentWaterSourceId();
  const eventId = useCurrentEventId();
  const { data: communityData } = useCommunityData();
  const { data: rainGeoJson } = useRainGeoJson();
  const { data: pumpsGeoJson } = usePumpsGeoJson();
  const { data: waterSourcesGeoJson } = useWaterSourcesGeoJson();
  const { data: eventsGeoJson } = useEventsGeoJson();
  const { data: woodsGeoJson } = useWoodsGeoJson();
  const { data: treesGeoJson } = useTreesGeoJson();
  const { treeData: selectedTreeData } = useTreeData(treeId);
  const { waterSourceData: selectedWaterSourceData } = useWaterSourceData(waterSourceId);
  const { eventData: selectedEventData } = useEventData(eventId);
  const history = useHistory();

  const initialTreeCount = (treesGeoJson as any).features.length
  const initialPumpCount = (waterSourcesGeoJson as any).features.filter(
    (feature) => feature.properties?.type === 'Handschwengelpumpe').length;
  const initialWaterSourceCount = (waterSourcesGeoJson as any).features.filter(
    (feature) => feature.properties?.type !== 'LEIPZIG GIESST-Mobil' && feature.properties?.type !== 'Handschwengelpumpe').length;
  const startOfDay = new Date();
  startOfDay.setUTCHours(0,0,0,0);
  const eventFeatures = (eventsGeoJson as any).features.filter(feature => new Date(feature.properties.date) >= startOfDay);
  const initialEventCount = eventFeatures.length;
  const [treeCount, setTreeCount] = useState(initialTreeCount);
  const [pumpCount, setPumpCount] = useState(initialPumpCount);
  const [waterSourceCount, setWaterSourceCount] = useState(initialWaterSourceCount);
  const [eventCount, setEventCount] = useState(initialEventCount);
  const [zoom, setZoom] = useState(isMobile ? 13 : 11);

  const debouncedSet = useCallback(
    debounce(({deck, map}) => {
      const zoomLevels = deck.viewports.map(vp => vp.zoom)
      const zoomLevel = zoomLevels.length > 0 ? zoomLevels[0] : 15;
      const getTreeCount = () => {
        return new Promise((resolve) => {
          const mapBounds = map && isMobile && map.getBounds();
          const bounds = mapBounds ? [mapBounds.getNorthWest(), mapBounds.getSouthEast()]
            .map(corner => [corner.lng, corner.lat]) : [];
          const treeCountToUse = bounds.length ? map?.queryRenderedFeatures([[bounds[0][0], bounds[0][1]], [bounds[1][0], bounds[1][1]]],
                { layers: [ 'trees' ]})?.length : map.querySourceFeatures('trees');
          return resolve(treeCountToUse);
        })
      };
      const getFeatureCount = (layerId, filterFun) => {
        return new Promise((resolve) => {
            const infos = deck.pickObjects({
              x: 0,
              y: 0,
              width: deck.deck.width,
              height: deck.deck.height,
              layerIds: [layerId]
            });
            return (infos && infos.length) ? resolve(infos.filter(filterFun).length) : resolve(0);
        })
      };
      if (zoomLevel >= 15) {
        if (!isMobile) {
          getFeatureCount('geojson', () => true).then((count) => setTreeCount((count as number)));
        } else {
          getTreeCount().then((count) => setTreeCount((count as number)));
        }
        getFeatureCount('waterSources', (feature) => feature?.object?.properties?.type === 'Handschwengelpumpe').then((count) => setPumpCount(count as number));
        getFeatureCount('waterSources', (feature) => feature?.object?.properties?.type !== 'LEIPZIG GIESST-Mobil' && feature?.object?.properties?.type !== 'Handschwengelpumpe').then((count) => setWaterSourceCount(count as number));
        getFeatureCount('events', () => true).then((count) => setEventCount(count as number));
      } else {
        setTreeCount(initialTreeCount);
        setPumpCount(initialPumpCount);
        setWaterSourceCount(initialWaterSourceCount);
        setEventCount(initialEventCount);
      }
    }, 500),
    [],
  );

  const onViewStateChanged = useCallback(() => {
    if (deckRef.current) {
      const deck = deckRef.current;
      debouncedSet({ deck, map: mapRef.current });
    }
  }, [])

  return (
    <DeckGlMap
      ref={mapRef}
      deckRef={deckRef}
      treeCount={treeCount}
      pumpCount={pumpCount}
      waterSourceCount={waterSourceCount}
      eventCount={eventCount}
      handleViewStateChanged={onViewStateChanged}
      zoom={zoom}
      setZoom={setZoom}
      onTreeSelect={(id: string) => {
        const nextLocation = `/tree/${id}`;
        history.push(nextLocation);
      }}
      onWaterSourceSelect={(id: string) => {
        const nextLocation = `/watersource/${id}`;
        history.push(nextLocation);
      }}
      onEventSelect={(id: string) => {
        const nextLocation = `/event/${id}`;
        history.push(nextLocation);
      }}
      treesGeoJson={treesGeoJson || null}
      rainGeojson={rainGeoJson || null}
      visibleMapLayer={visibleMapLayer}
      isNavOpen={!!isNavOpened}
      showControls={showOverlay}
      pumpsGeoJson={pumpsGeoJson || null}
      waterSourcesGeoJson={waterSourcesGeoJson || null}
      woodsGeoJson={woodsGeoJson || null}
      ageRange={ageRange || []}
      mapViewFilter={mapViewFilter}
      communityData={communityData?.communityFlagsMap || null}
      communityDataWatered={communityData?.wateredTreesIds || []}
      communityDataAdopted={communityData?.adoptedTreesIds || []}
      selectedTreeId={treeId || undefined}
      selectedWaterSourceId={waterSourceId || undefined}
      selectedEventId={eventId || undefined}
      focusPoint={selectedTreeData || selectedWaterSourceData || selectedEventData || mapFocusPoint}
    />
  );
};
