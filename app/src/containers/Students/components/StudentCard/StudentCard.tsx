import React from 'react';
import styled from 'styled-components';

import { Student } from 'containers/Students/StudentService';

interface StudentCardProps {
  student: Student;
};

const StudentCardContainer = styled.div`
  display: flex;

  padding: 24px;
  margin-bottom: 16px;

  border-radius: 4px;
  word-wrap: break-word;

  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .2);
`;

const PortraitContainer = styled.div`
  margin-right: 32px;

  @media only screen and (max-width: 860px) {
    display: none;
  }
`;

const Portrait = styled.img`
  border-radius: 72px;
`;

export const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <StudentCardContainer>
      <PortraitContainer>
        <Portrait alt="portrait" src={student.gravatar} />
      </PortraitContainer>
      <div>
        <p>Name: {student.name}</p>
        <p>Email: {student.email}</p>
        <p>CPF: {student.cpf}</p>
      </div>
    </StudentCardContainer>
  );
};
