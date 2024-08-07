import React, { FC } from 'react';
import { useHistory } from 'react-router';

import SidebarTitle from '../SidebarTitle/';
import ExpandablePanel from '../../ExpandablePanel';
import SmallParagraph from '../../SmallParagraph';
import { useEventsGeoJson } from '../../../utils/hooks/useEventsGeoJson';

const SidebarEvents: FC = () => {
  const history = useHistory();

  const { isLoading: isLoadingEventsGeojson, data: eventsGeoJson } = useEventsGeoJson();
  if (isLoadingEventsGeojson) {
    return (<div>Laden...</div>)
  }
  const startOfDay = new Date();
  startOfDay.setUTCHours(0,0,0,0);
  const eventFeatures = eventsGeoJson.features.filter(feature => new Date(feature.properties.date) >= startOfDay);
  return (
    <>
      <SidebarTitle>Gießevents</SidebarTitle>
      {eventFeatures.map(feature => (
        <ExpandablePanel isExpanded title={feature.properties.name} key={feature.properties.id}>
          <SmallParagraph>{new Date(feature.properties.date).toLocaleDateString()}{feature.properties.start ? ', ' + feature.properties.start : ''}{feature.properties.end ? ' - ' + feature.properties.end : ''}</SmallParagraph>
          <SmallParagraph>{feature.properties.address ? feature.properties.address : ''}</SmallParagraph>
          <SmallParagraph><div style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => { history.push("/event/" + feature.properties.id)}}>Zum Event</div></SmallParagraph>
        </ExpandablePanel>
      ))}
    </>
  );
};

export default SidebarEvents;
