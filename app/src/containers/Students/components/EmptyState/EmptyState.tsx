import React from 'react';
import styled from 'styled-components';

const EmptyStateContainer = styled.div`
  display: flex;

  justify-content: center;

  padding: 32px;

  border-radius: 4px;

  background-color: white;
`;

export const EmptyState: React.FC = () => {
  return (
    <EmptyStateContainer>
      <h1>No results found.</h1>
    </EmptyStateContainer>
  );
};
