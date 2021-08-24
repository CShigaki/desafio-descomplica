import React from 'react';
import styled from 'styled-components';

import { CircularProgress } from '@material-ui/core';

const LoaderContainer = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
`;

export const Loader: React.FC = () => {
  return (
    <LoaderContainer data-testid="loader">
      <CircularProgress />
    </LoaderContainer>
  );
};
