import React, { FC } from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { useHistory } from 'react-router';

import OverlayTitle from '../OverlayTitle/';
import OverlayEvent from '../OverlayEvent/';
import Icon from '../../Icons';
import OverlayBeta from '../OverlayBeta/';
import OverlayParagraph from '../OverlayParagraph';
import OverlayDescription from '../OverlayDescription/';
import ButtonRound from '../../../components/ButtonRound/';
import Login from '../../../components/Login/';

import content from '../../../assets/content';
import { useActions } from '../../../state/unistore-hooks';
import OverlayClose from '../OverlayClose';

const Wrapper = styled.div`
  display: flex;
  img {
    transform: translate(-35px, -20px);
    @media screen and (max-width: ${p => p.theme.screens.tablet}) {
      transform: translate(-35px, -40px);
    }
  }
`;

const StyledTop = styled.div`
  height: 500px;
  height: auto;
  padding: 40px 0;
`;

const StyledWrapper = styled.div`
  display: flex;
  margin: 20px 40px 20px 40px;
  cursor: pointer;
  div {
    margin-right: 10px;
    @media screen and (max-width: ${p => p.theme.screens.tablet}) {
      margin-bottom: 10px;
    }
  }

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    flex-direction: column;
  }
`;

const OverlayTop: FC = () => {
  const history = useHistory();
  const { closeOverlay } = useActions();
  const { intro, eventNote, whatsNew } = content;

  const { title, subline, description, disclaimer } = intro;

  return (
    <StyledTop>
      <Wrapper>
        <OverlayTitle size='xxl' title={title} />
        <img style={{ height: 160 }} src='images/leipzig-giesst-logo.png' />
        {!isMobile && (<div style={{ width: '60%', fontSize: '16pt', fontStyle: 'bold', color: 'blue' }}>
          Triff uns am 30. August auf der <b>Klimafair</b>. Mehr Infos folgen <a style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => { history.push("/event/20250830_klimafair")}}>hier</a>.
        </div>)}
      </Wrapper>
      <OverlayTitle size='small' title={""} />
      {isMobile && (<div style={{ paddingLeft: '40px', paddingBottom: '20px', width: '60%', fontSize: '16pt', fontStyle: 'bold', color: 'blue' }}>
          Triff uns am 30. August auf der <b>Klimafair</b>. Mehr Infos <a style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => { history.push("/event/20250830_klimafair")}}>hier</a>.
        </div>)}
      <OverlayTitle size='xxl' title={subline} />
      {isMobile && <OverlayTitle size='medium' title={disclaimer} />}
      {/* the beow is here for local testing */}
      {/* {true && <OverlayTitle size='medium' content={disclaimer} />} */}
      <OverlayDescription content={description} />
      <OverlayClose onClick={closeOverlay} />
      <StyledWrapper>
        <ButtonRound
          width='fit-content'
          onClick={() => {
            closeOverlay();
          }}
          type='primary'
        >
          Los geht&apos;s
        </ButtonRound>
        <Login width='fit-content' noLogout={true} />
      </StyledWrapper>
      {(eventNote !== undefined || whatsNew !== undefined) && (
        <OverlayTitle size='xl' title={'News & Updates'} />
      )}

      {eventNote && <OverlayEvent size='Ll' title={eventNote.title} />}
      {whatsNew && <OverlayDescription content={whatsNew.description} />}
    </StyledTop>
  );
};

export default OverlayTop;
