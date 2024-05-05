import React, { FC } from 'react';
import SidebarTitle from '../SidebarTitle';
import EventInfos from './EventInfos';
import LoadingIcon, { SidebarLoadingContainer } from '../../LoadingIcon';
import { useEventData } from '../../../utils/hooks/useEventData';
import { useCurrentEventId } from '../../../utils/hooks/useCurrentEventId';
import { ImprintAndPrivacy } from '../../ImprintAndPrivacy';
import { SidebarLoading } from '../SidebarLoading';

const SidebarEvent: FC<{ isLoading?: boolean }> = ({
  isLoading: isLoadingProps,
}) => {
  const eventId = useCurrentEventId();
  const { eventData: selectedEventData, error } = useEventData(eventId);
  const isLoadingState = !error && !selectedEventData;
  const isLoading = isLoadingProps || isLoadingState || false;

  if (isLoading) return <SidebarLoading title='Information zu Gießevent' />;

  return (
    <>
      <SidebarTitle>Information zu Gießevent</SidebarTitle>
      {!isLoading && selectedEventData && (
        <EventInfos selectedEventData={selectedEventData} />
      )}
      {error && (
        <>
          <SidebarLoadingContainer>
            <LoadingIcon text={error.message} hasError={!!error} />
            <ImprintAndPrivacy />
          </SidebarLoadingContainer>
        </>
      )}
    </>
  );
};

export default SidebarEvent;
