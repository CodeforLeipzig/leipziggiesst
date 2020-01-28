import React from 'react';
import styled from 'styled-components';

import Spinner from '../../Spinner/';

const SidebarLoadingCardDiv = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 3;
  height: auto;
  margin-top: 20px;
  width: 280px;
  padding: 10px;
  border-radius: ${props => props.theme.borderRadiusS};
  margin-bottom: 10px;
  background: white;
  box-shadow: 0px 2px 3px 0px rgba(44,48,59,0.1);
`;

const SidebarLoadingCard = p => {
  const { state } = p;

  let content = '';

  switch (state) {
    case 'LOADING':
      content = 'Lade Daten ...'
      break;

    case 'ADOPT':
      content = 'Lade abonnierte Bäume ...'
      break;

    default:
      break;
  }

  return (
    <SidebarLoadingCardDiv>
      <Spinner/>
      <span>{content}</span>
    </SidebarLoadingCardDiv>
  )
}

export default SidebarLoadingCard;
