import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SidebarAbout from './SidebarAbout/';
import SidebarSearch from './SidebarSearch/';
import SidebarProfile from './SidebarProfile/';
import SidebarEvents from './SidebarEvents';
import SidebarTree from './SidebarTree';
import SidebarWaterSource from './SidebarWaterSource';
import SidebarEvent from './SidebarEvent';
import SidebarStatistics from './SidebarStatistics';
import SidebarWatering from './SidebarWatering';
import SidebarWrapper from './SidbarWrapper';

const Sidebar: React.FC = () => (
  <Route
    path={['/about', '/search', '/profile', '/events', '/statistics', '/tree/:treeId', '/watersource/:watersourceId', '/event/:eventId', '/watering/:wateringId']}
    render={({ match }) => {
      return (
        <SidebarWrapper isVisible={!!match}>
          <Switch>
            <Route path='/about' component={SidebarAbout} />
            <Route path='/search' component={SidebarSearch} />
            <Route path='/events' component={SidebarEvents} />
            <Route path='/statistics' component={SidebarStatistics} />
            <Route path='/tree/:treeId' component={SidebarTree} />
            <Route path='/watersource/:watersourceId' component={SidebarWaterSource} />
            <Route path='/event/:eventId' component={SidebarEvent} />
            <Route path='/watering/:wateringId' component={SidebarWatering} />
            <Route path='/profile' component={SidebarProfile} />
          </Switch>
        </SidebarWrapper>
      );
    }}
  />
);

export default Sidebar;
