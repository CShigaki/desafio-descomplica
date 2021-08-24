import React, { useMemo, useCallback, useState } from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';

import { StudentCard } from '../StudentCard';
import { Pagination } from '../Pagination';
import { EmptyState } from '../EmptyState';
import { Student } from 'containers/Students/StudentService';
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

export const StudentsList: React.FC<StudentsListProps> = ({ filter }) => {
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    page: 0,
    rowsPerPage: 10,
  });

  const createQuery = useCallback(() => {
    return gql`
      {
        students (filter: "${filter}", page: ${paginationInfo.page}, perPage: ${paginationInfo.rowsPerPage}) {
          results {
            id
            email
            cpf
            name
            gravatar
          }
          metadata {
            currentPage
            perPage
            pageCount
            total
          }
        }
      }
    `
  }, [filter, paginationInfo]);

  const { data, loading } = useQuery(createQuery());
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
      page: paginationInfo.page,
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
