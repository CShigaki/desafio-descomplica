import React from 'react';
import { Routes } from './Routes';
import { PageContainer } from 'components/PageContainer';

function App() {
  return (
    <div className="App">
      <PageContainer>
        <Routes />
      </PageContainer>
    </div>
  );
}

export default App;
