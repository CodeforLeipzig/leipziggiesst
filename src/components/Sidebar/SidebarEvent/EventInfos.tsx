import React, { FC, useState } from 'react';
import styled from 'styled-components';
import ShareIcon from '@material-ui/icons/Share';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import copy from "copy-to-clipboard";

import ExpandablePanel from '../../ExpandablePanel';
import { SelectedEventType } from '../../../common/interfaces';

const Wrapper = styled.div`
  z-index: 3;
  margin: 0 0 20px;
`;

const FlexColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SublineSpan = styled.span`
  margin-bottom: 0.75rem;
  text-transform: capitalize;
`;

const EventTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-top: 0px;
  line-height: 125%;
  margin-bottom: 5px;
  button {
    padding-bottom: 15px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
  padding: 12px 0;
  font-weight: bold;
`;

const InfoValue = styled.span`
  font-weight: normal;
`;

const EventInfos: FC<{
  selectedEventData: SelectedEventType;
}> = ({ selectedEventData }) => {
  const {
    id,
    name,
    organisation,
    type,
    date,
    start,
    end,
    address,
    hints,
    images,
    url,
  } = selectedEventData;

  const [open, setOpen] = useState(false);

  const getEventLink = () => window.location.href;

  const handleLink = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Gießevent-Link',
        text: 'Teile den Link zum Gießevent',
        url: getEventLink()
      })
      .catch(console.error);
    } else {
      setOpen(true)
    }
  };

  return (
    <Wrapper>
      <Dialog onClose={() => setOpen(false)} aria-labelledby="share-event-dialog-title" open={open}>
        <DialogTitle id="share-event-dialog-title">Gießevent-Link</DialogTitle>
        <DialogContent>
          <DialogContentText>Teile den Link zum Gießevent:</DialogContentText>
          <DialogContentText>
            <a href={`${getEventLink()}`}>{getEventLink()}</a>
            <IconButton onClick={() => copy(getEventLink())}>
              <FileCopyIcon />
            </IconButton>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
      <FlexColumnDiv>
        {name && (
          <EventTitle>
            {name}
            <IconButton onClick={handleLink}><ShareIcon /></IconButton>
          </EventTitle>
        )}
        {type && (
          <SublineSpan>{type}</SublineSpan>
        )}
        {organisation && organisation !== name && (
          <InfoContainer>
            <span>Organisation</span>
            <InfoValue>{organisation}</InfoValue>
          </InfoContainer>
        )}
        {address && (
          <InfoContainer>
            <span>Adresse</span>
            <InfoValue>{address}</InfoValue>
          </InfoContainer>
        )}
        {date && (
          <InfoContainer>
            <span>Datum</span>
            <InfoValue>{new Date(date).toLocaleDateString()}</InfoValue>
          </InfoContainer>
        )}
        {start && (
          <InfoContainer>
            <span>Beginn</span>
            <InfoValue>{start}</InfoValue>
          </InfoContainer>
        )}
        {end && (
          <InfoContainer>
            <span>Ende</span>
            <InfoValue>{end}</InfoValue>
          </InfoContainer>
        )}
        {hints && Array.isArray(hints) && hints.length > 0 && (
          <ExpandablePanel title={"Hinweise"} isExpanded={true}>
            <ul>
              { hints.map( (hint, index) => (
                <li key={`hint-${index}`}><div dangerouslySetInnerHTML={{ __html: `${hint}` }}></div></li>
              ))}
            </ul>
          </ExpandablePanel>
        )}
        {url && (
          <InfoContainer>
            <span>Weitere Informationen</span>
            <InfoValue><a target="_blank" href={url}>Link</a></InfoValue>
          </InfoContainer>
        )}
        {images && Array.isArray(images) && images.length > 0 && (
          <ExpandablePanel title={"Fotos"} isExpanded={true}>
              { images.map( image => (
                <span>
                  {<img src={`/images/events/${id}/${image}`} alt={image} width={"100%"} />}
                </span>
              ))}
          </ExpandablePanel>
        )}
      </FlexColumnDiv>
    </Wrapper>
  );
};

export default EventInfos;
