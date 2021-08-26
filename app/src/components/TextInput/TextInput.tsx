import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledTextInput = styled.input`
  padding: 9px 8px;

  border: 1px solid var(--black-transparent-border);
  border-radius: 4px;

  outline: 0;
`;

export const TextInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return <StyledTextInput {...props} />;
};
