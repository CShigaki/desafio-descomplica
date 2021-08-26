import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loader } from 'components/Loader';

describe('Loader', () => {
  it('renders loader', async () => {
    render(<Loader />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
