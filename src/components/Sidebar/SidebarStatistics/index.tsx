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
      <br /><br />
      Mehr Statistiken gibt es <a target="_blank" href="https://joergreichert.github.io/gdk-opendata-plot/">hier</a> und <a target="_blank" href="https://dashboard.codeforleipzig.de/d/RQFRCgeGk/leipziggiesstpublic?orgId=3&from=1709247600000&to=now">hier</a>.
    </Wrapper>
  );
};

export default SidebarStatistics;
