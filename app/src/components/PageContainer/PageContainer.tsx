import React, { ReactChild, ReactChildren } from 'react';
import { PageSidebar } from 'components/PageSidebar';
import { PageHeader } from 'components/PageHeader';
import styled from 'styled-components';

interface PageContainerProps {
  children: ReactChild | ReactChildren;
}

const PageWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(100% - 72px);
  flex: 1;
`

const Content = styled.div`
  padding: 12px;
`;

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <PageWrapper>
      <PageSidebar />
      <MainContainer>
        <PageHeader />
        <Content>
          {children}
        </Content>
      </MainContainer>
    </PageWrapper>
  );
};