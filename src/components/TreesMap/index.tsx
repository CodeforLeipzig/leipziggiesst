import React, { FC, useRef, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import DeckGlMap from './DeckGLMap';
import { useStoreState } from '../../state/unistore-hooks';
import { useTreeData } from '../../utils/hooks/useTreeData';
import { useWaterSourceData } from '../../utils/hooks/useWaterSourceData';
import { useHistory } from 'react-router';
import { useCurrentTreeId } from '../../utils/hooks/useCurrentTreeId';
import { useCurrentWaterSourceId } from '../../utils/hooks/useCurrentWaterSourceId';
import { useCommunityData } from '../../utils/hooks/useCommunityData';
import { useRainGeoJson } from '../../utils/hooks/useRainGeoJson';
import { usePumpsGeoJson } from '../../utils/hooks/usePumpsGeoJson';
import { useWaterSourcesGeoJson } from '../../utils/hooks/useWaterSourcesGeoJson';
import { useWoodsGeoJson } from '../../utils/hooks/useWoodsGeoJson';
import { useTreesGeoJson } from '../../utils/hooks/useTreesGeoJson';

export const Map: FC<{
  showOverlay: boolean | undefined;
  isNavOpened: boolean | undefined;
}> = ({ showOverlay, isNavOpened }) => {
  const deckRef = useRef(null);
  const visibleMapLayer = useStoreState('visibleMapLayer');
  const ageRange = useStoreState('ageRange');
  const mapViewFilter = useStoreState('mapViewFilter');
  const mapFocusPoint = useStoreState('mapFocusPoint');

  const treeId = useCurrentTreeId();
  const waterSourceId = useCurrentWaterSourceId();
  const { data: communityData } = useCommunityData();
  const { data: rainGeoJson } = useRainGeoJson();
  const { data: pumpsGeoJson } = usePumpsGeoJson();
  const { data: waterSourcesGeoJson } = useWaterSourcesGeoJson();
  const { data: woodsGeoJson } = useWoodsGeoJson();
  const { data: treesGeoJson } = useTreesGeoJson();
  const { treeData: selectedTreeData } = useTreeData(treeId);
  const { waterSourceData: selectedWaterSourceData } = useWaterSourceData(waterSourceId);
  const history = useHistory();

  const [treeCount, setTreeCount] = useState((treesGeoJson as any).features.length);
  const [waterSourceCount, setWaterSourceCount] = useState((waterSourcesGeoJson as any).features.filter(
    (feature) => feature.properties?.type !== 'LEIPZIG GIESST-Mobil').length);
  const [mobileCount, setMobileCount] = useState((waterSourcesGeoJson as any).features.filter(
    (feature) => feature.properties?.type === 'LEIPZIG GIESST-Mobil').length);
  const [zoom, setZoom] = useState(10);

  const debouncedSet = useCallback(
    debounce(deck => {
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
      getFeatureCount('geojson', () => true).then((count) => setTreeCount(count as number));
      getFeatureCount('waterSources', (feature) => feature?.object?.properties?.type !== 'LEIPZIG GIESST-Mobil').then((count) => setWaterSourceCount(count as number));
      getFeatureCount('waterSources', (feature) => feature?.object?.properties?.type === 'LEIPZIG GIESST-Mobil').then((count) => setMobileCount(count as number));
    }, 500),
    [],
  );

  const onViewStateChanged = useCallback(() => {
    if (deckRef.current) {
      const deck = deckRef.current;
      debouncedSet(deck);
    }
  }, [])

  return (
    <DeckGlMap
      deckRef={deckRef}
      treeCount={treeCount}
      waterSourceCount={waterSourceCount}
      mobileCount={mobileCount}
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
      focusPoint={selectedTreeData || selectedWaterSourceData || mapFocusPoint}
    />
  );
};
