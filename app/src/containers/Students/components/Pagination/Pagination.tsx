import React, { useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import { TablePaginationActionsProps } from '@material-ui/core/TablePagination/TablePaginationActions';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import styled from 'styled-components';

const ActionsContainer = styled.div`
  display: flex;
`;

const IconButtonWithLessPadding = styled(IconButton)`
  &:nth-child(1) {
    padding-left: 12px;
  }
  padding-left: 4px;
  padding-right: 0 !important;
`;

const TablePaginationActions: React.FC<TablePaginationActionsProps> = ({ count, onPageChange, page, rowsPerPage }) => {
  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <ActionsContainer>
      <IconButtonWithLessPadding onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        <FirstPageIcon />
      </IconButtonWithLessPadding>
      <IconButtonWithLessPadding onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        <KeyboardArrowLeft />
      </IconButtonWithLessPadding>
      <IconButtonWithLessPadding
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        data-testid="pagination-next-page"
      >
        <KeyboardArrowRight />
      </IconButtonWithLessPadding>
      <IconButtonWithLessPadding
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPageIcon />
      </IconButtonWithLessPadding>
    </ActionsContainer>
  );
};

interface PaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  handleChangeRowsPerPage: Function;
  handlePageChange: Function;
}

export const Pagination: React.FC<PaginationProps> = ({ page, count, rowsPerPage, handleChangeRowsPerPage, handlePageChange }) => {
  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      SelectProps={{ style: { marginRight: '5px', overflow: 'hidden' } }}
      ActionsComponent={TablePaginationActions}
      labelRowsPerPage=""
      onPageChange={(_: any, page: number) => handlePageChange(page)}
      // labelDisplayedRows={({ from, to, count }) => `${from}-${to} até ${count !== -1 ? count : to}`}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={(event) => handleChangeRowsPerPage(Number(event.target.value))}
    />
  );
}