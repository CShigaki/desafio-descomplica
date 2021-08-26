import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;

  align-items: center;
  padding: 0 16px;
  height: 50px;
  min-height: 50px;

  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);

  background-color: white;
`;

export const PageHeader: React.FC = () => {
  return <Header>This is the header</Header>;
};
