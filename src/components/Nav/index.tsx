import React, { FC } from 'react';
import styled from 'styled-components';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import AccountCircle from '@material-ui/icons/AccountCircleOutlined';
import SearchIcon from '@material-ui/icons/Search';
import SquareButton from '../SquareButton';
import Icon from '../Icons';

interface StyledProps {
  active?: boolean;
  isNavOpened?: boolean;
}
const NavWrapper = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  flex: 1;
  box-shadow: ${props => props.theme.boxShadow};
  flex-grow: 0;
  position: absolute;
  top: 12px;
  left: 12px;
  background: white;
  z-index: 1;
  transition: transform 500ms;

  @media screen and (min-width: ${p => p.theme.screens.tablet}) {
    transform: ${props =>
      props.isNavOpened ? 'translate3d(350px, 0, 0)' : 'none'};
  }
`;

const NavItem = styled(NavLink)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 1;
  text-decoration: none;
`;

const navConfig = [
  { path: '/search', title: 'Suche und Filter', icon: <SearchIcon /> },
  { path: '/about', title: 'Info', icon: <InfoIcon /> },
  { path: '/profile', title: 'Profil', icon: <AccountCircle /> },
  { path: '/achievements', title: 'Achievements', icon:  <div style={{marginLeft: 23}}><Icon iconType={'achievements'} height={32} /></div> },
  { path: '/statistics', title: 'Gießstatistiken', icon: <div style={{marginLeft: 23}}><Icon iconType={'leaderboard'} height={32} /></div> },
  { path: '/events', title: 'Gießevents', icon: <div style={{marginLeft: 23}}><Icon iconType={'events'} height={32} /></div> },
];

const Nav: FC<{
  isNavOpened: boolean;
}> = ({ isNavOpened }) => {
  const { pathname } = useLocation();
  const history = useHistory();

  return (
    <NavWrapper isNavOpened={isNavOpened}>
      {navConfig.map(item => (
        <NavItem
          exact
          to={{ pathname: item.path, search: '' }}
          onClick={() => history.push('/')}
          title={item.title}
          key={item.path}
        >
          <SquareButton
            title={item.title}
            aria-label={item.title}
            isActive={pathname === item.path}
          >
            {item.icon}
          </SquareButton>
        </NavItem>
      ))}
    </NavWrapper>
  );
};

export default Nav;
