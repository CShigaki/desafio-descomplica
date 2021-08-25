import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import { StudentCard } from '../StudentCard';
import { Pagination } from '../Pagination';
import { EmptyState } from '../EmptyState';
import { Student, STUDENTS_QUERY } from 'containers/Students/StudentService';
import { Loader } from 'components/Loader';

interface StudentsListProps {
  filter: string;
}

interface PaginationInfo {
  page: number;
  rowsPerPage: number;
}

const StudentListContainer = styled.div`
  margin-top: 16px;
`;

// This will only be tested using the integration tests.
export const StudentsList: React.FC<StudentsListProps> = ({ filter }) => {
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    page: 0,
    rowsPerPage: 10,
  });

  const { data, loading } = useQuery(STUDENTS_QUERY, {
    variables: {
      filter,
      page: paginationInfo.page,
      perPage: paginationInfo.rowsPerPage,
    },
  });

  const memoizedStudents = useMemo(() => {
    return (
      <StudentListContainer>
        {data?.students.results.map((student: Student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </StudentListContainer>
    );
  }, [data]);

  const handleChangeRowsPerPage = (rowsPerPage: number) => {
    setPaginationInfo({
      page: 0,
      rowsPerPage,
    });
  }

  const handlePageChange = (page: number) => {
    setPaginationInfo({
      page,
      rowsPerPage: paginationInfo.rowsPerPage,
    });
  };

  return (
    <StudentListContainer>
      {loading &&
        <Loader />
      }
      {(!loading && 0 !== data.students.results.length) && (
        <>
          {memoizedStudents}
          <Pagination
            count={data?.students.metadata.total}
            page={paginationInfo.page}
            rowsPerPage={paginationInfo.rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handlePageChange={handlePageChange}
          />
        </>
      )}
      {!loading && 0 === data.students.results.length &&
        <EmptyState />
      }
    </StudentListContainer>
  );
};
