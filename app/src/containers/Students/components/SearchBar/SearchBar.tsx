import React, { useState } from 'react';
import styled from 'styled-components';
import { useDebounce } from 'react-use';

import { TextInput } from 'components/TextInput';

interface SearchBarProps {
  onChange: Function;
}

const SearchBarContainer = styled.div`
  padding: 20px;
  border-radius: 4px;

  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
`;

const SearchFieldContainer = styled.div`
  display: flex;

  flex-direction: row;
  justify-content: space-between;
`;

const StyledTextInput = styled(TextInput)`
  width: 100%;
`;

export const SearchBar: React.FC<SearchBarProps> = ({ onChange }) => {
  const [filter, setFilter] = useState<string>('');

  useDebounce(
    () => {
      onChange(filter);
    },
    1000,
    [filter]
  );

  return (
    <SearchBarContainer>
      <SearchFieldContainer>
        <StyledTextInput
          data-testid="search-field"
          aria-label="Name, CPF or email"
          name="filter"
          type="text"
          placeholder="Name, CPF or email"
          onChange={({ currentTarget }) => {
            setFilter(currentTarget.value);
          }}
        />
      </SearchFieldContainer>
    </SearchBarContainer>
  );
};
