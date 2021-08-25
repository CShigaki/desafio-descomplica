import React from 'react';

import { Pagination } from './Pagination';
import { render, screen, fireEvent, within } from '@testing-library/react';

const mockHandleChangeRowsPerPage = jest.fn(() => {});
const mockHandlePageChange = jest.fn(() => {});

describe('Pagination', () => {
  it('renders values correctly using supplied props', async () => {
    render(
      <Pagination
        count={72}
        page={0}
        rowsPerPage={25}
        handleChangeRowsPerPage={mockHandleChangeRowsPerPage}
        handlePageChange={mockHandlePageChange}
      />
    );

    expect(screen.getByText(/1-25 of 72/i)).toBeVisible();
  });

  it('calls page change handler when clicking on next page', async () => {
    render(
      <Pagination
        count={72}
        page={0}
        rowsPerPage={25}
        handleChangeRowsPerPage={mockHandleChangeRowsPerPage}
        handlePageChange={mockHandlePageChange}
      />
    );

    screen.getByTestId('pagination-next-page').click();
    screen.getByTestId('pagination-previous-page').click();

    expect(mockHandlePageChange).toBeCalledTimes(2);
  });

  it('calls rows per page change handler when selecting a different amount', async () => {
    render(
      <Pagination
        count={72}
        page={0}
        rowsPerPage={10}
        handleChangeRowsPerPage={mockHandleChangeRowsPerPage}
        handlePageChange={mockHandlePageChange}
      />
    );


    const rowsPerPageContainer = within(screen.getByTestId('rows-per-page'));
    fireEvent.mouseDown(rowsPerPageContainer.getByRole('button'));

    const rowCountContainer = within(screen.getByRole('listbox'));
    rowCountContainer.getByText(/25/i).click();

    expect(mockHandleChangeRowsPerPage).toHaveBeenCalledTimes(1);
  });
});