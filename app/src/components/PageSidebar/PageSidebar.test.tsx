import React from 'react';
import { render, screen } from '@testing-library/react';
import { PageSidebar } from 'components/PageSidebar';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/students',
  }),
}));

describe('PageSidebar', () => {
  it('renders sidebar with all links and selected', async () => {
    render(
      <Router>
        <PageSidebar />
      </Router>
    );

    const studentsLink = screen.getByTestId('link-students');
    const homeLink = screen.getByTestId('link-home');

    expect(studentsLink).toBeVisible();
    expect(homeLink).toBeVisible();
    expect(studentsLink.className).toBe('sidebar-selected-page');
  });
});
