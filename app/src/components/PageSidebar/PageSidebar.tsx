import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Face,
  Home,
  ChevronRight,
  ChevronLeft
} from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

const NavBase = styled.nav`
  width: 72px;

  transition: all 1s;

  &.closed {
    width: 0;
    min-width: 0;
  }

  // If somehow the user close the sidebar and managed to get to a resolution high enough
  // to now show the chevron, always show the sidebar, even if they closed it.
  @media only screen and (min-width: 860px) {
    &.closed {
      width: 72px;
      min-width: 72px;
    }
  }
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  position: fixed;

  width: 72px;
  min-width: 72px;
  height: 100%;

  color: var(--gray-light);
  background-color: var(--gray-dark);
  transition: all 1s;

  svg {
    width: 100%;
    height: 1.4em;
    padding: 16px 0;
  }

  .sidebar-selected-page {
    background-color: var(--gray-darker);

    border-width: 0 0 0 2px;
    border-color: var(--gray-light);
    border-style: solid;
    border-radius: 2px;
  }

  &.closed .sidebar-selected-page {
    border: 0;
  }

  a.sidebar-selected-page:hover {
    background-color: var(--gray-darker) !important;
  }

  &.closed {
    width: 0;
    min-width: 0;
  }

  &.closed .toggle-sidebar {
    left: 0;
  }

  a:hover {
    background-color: var(--gray-light-hover);
  }

  @media only screen and (min-width: 860px) {
    &.closed {
      width: 72px;
      min-width: 72px;
    }
  }
`;

const ToggleSidebarButton = styled.div`
  display: none;

  position: fixed;

  top: calc(50vh - 16px);
  left: 65px;

  color: var(--gray-dark);
  transition: left .7s linear;

  @media only screen and (max-width: 860px) {
    display: block;
  }
`;

export const PageSidebar: React.FC = () => {
  const [ isOpen, setIsOpen ] = useState<boolean>(true);
  const location = useLocation();

  const toggleSidebar = (event: any) => {
    setIsOpen(!isOpen);
  };

  return (
    <NavBase className={isOpen ? '' : 'closed'} data-testid="sidebar">
      <Sidebar className={isOpen ? '' : 'closed'}>
        <ToggleSidebarButton className="toggle-sidebar">
          {isOpen &&
            <ChevronLeft onClick={toggleSidebar} data-testid="close-sidebar" />
          }
          {!isOpen &&
            <ChevronRight onClick={toggleSidebar} data-testid="open-sidebar" />
          }
        </ToggleSidebarButton>
        <Tooltip title="Home" placement="right">
          <Link
            aria-label="Home"
            className={'/' === location.pathname ? 'sidebar-selected-page' : ''}
            to="/"
            data-testid="link-home"
          >
            <Home/>
          </Link>
        </Tooltip>
        <Tooltip title="Students" placement="right">
          <Link
            aria-label="Students"
            className={'/students' === location.pathname ? 'sidebar-selected-page' : ''}
            to="/students"
            data-testid="link-students"
          >
            <Face />
          </Link>
        </Tooltip>
      </Sidebar>
    </NavBase>
  );
};