import React from 'react';

import { SearchBar } from './SearchBar';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('SearchBar', () => {
  it('triggers change function after debounce time', async () => {
    jest.useFakeTimers();

    const mockedOnChangeHandler = jest.fn(() => {});

    render(<SearchBar onChange={mockedOnChangeHandler} />);

    userEvent.type(screen.getByTestId('search-field'), 'celso');

    expect(mockedOnChangeHandler).not.toHaveBeenCalled();
    jest.advanceTimersByTime(500);
    expect(mockedOnChangeHandler).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(mockedOnChangeHandler).toHaveBeenCalledTimes(1);

    jest.clearAllTimers();
  });
});
