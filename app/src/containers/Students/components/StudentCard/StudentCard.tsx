import React from 'react';
import styled from 'styled-components';

import { Student } from 'containers/Students/StudentService';

interface StudentCardProps {
  student: Student;
}

const StudentCardContainer = styled.div`
  display: flex;

  padding: 24px;
  margin-bottom: 16px;

  border-radius: 4px;
  word-wrap: break-word;

  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
`;

const PortraitContainer = styled.div`
  margin-right: 32px;

  @media only screen and (max-width: 860px) {
    display: none;
  }
`;

const Portrait = styled.img`
  border-radius: 72px;

  max-width: 117px;
`;

export const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <StudentCardContainer data-testid="student-card">
      <PortraitContainer>
        <Portrait
          data-testid="student-portrait"
          alt="portrait"
          src={student.gravatar ?? '/fallback.png'}
        />
      </PortraitContainer>
      <div>
        <p>{student.name}</p>
        <p>{student.email}</p>
        <p>{student.cpf}</p>
      </div>
    </StudentCardContainer>
  );
};
