import React, { FC } from 'react';
import styled from 'styled-components';

import SidebarTitle from '../SidebarTitle/';
import SmallParagraph from '../../SmallParagraph';
import { useStatisticsJson } from '../../../utils/hooks/useStatisticsJson';

const Wrapper = styled.div`
  z-index: 3;
  margin: 0 0 20px;
`;

const SidebarStatistics: FC = () => {
  const { data: statisticsJson } = useStatisticsJson();

  return (
    <Wrapper>
      <SidebarTitle>Top-Gießende 2024</SidebarTitle>
      {(statisticsJson || []).map(user => (
        <SmallParagraph>{((user.pos < 10) ? '00' : ((user.pos < 100) ? '0' : '')) + user.pos}. {user.username} ({user.liter} Liter)</SmallParagraph>
      ))}
    </Wrapper>
  );
};

export default SidebarStatistics;
