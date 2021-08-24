import React, { useState } from 'react';
import styled from 'styled-components';

import { SearchBar } from './components/SearchBar';
import { StudentsList } from './components/StudentsList';

const StudentsContainer = styled.div`
  display: flex;

  flex-direction: column;

  padding: 8px;
`;

export const Students: React.FC = () => {
  const [filter, setFilter] = useState<string>('');

  const handleOnChange = (filter: string) => {
    setFilter(filter);
  };

  return (
    <StudentsContainer>
      <SearchBar onChange={handleOnChange}/>
      <StudentsList filter={filter}/>
    </StudentsContainer>
  );
};
