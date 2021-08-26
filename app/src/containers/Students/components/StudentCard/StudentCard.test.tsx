import React from 'react';

import { StudentCard } from './StudentCard';
import { Student } from 'containers/Students/StudentService';
import { render, screen } from '@testing-library/react';

describe('StudentCard', () => {
  it('renders the student card with the supplied prop', async () => {
    const student: Student = {
      id: '1',
      name: 'Celso',
      cpf: '11111111111',
      email: 'celso.shigaki@gmail.com',
      gravatar: 'gravatar-url',
    };

    render(<StudentCard student={student} />);

    expect(screen.getByText(/Celso/)).toBeVisible();
    expect(screen.getByText(/11111111111/i)).toBeVisible();
    expect(screen.getByText(/celso.shigaki@gmail.com/i)).toBeVisible();
    expect(screen.getByTestId('student-portrait').getAttribute('src')).toBe(
      'gravatar-url'
    );
  });

  it('renders fallback in case gravatar props isnt supplied', async () => {
    const student: Student = {
      id: '1',
      name: 'Celso',
      cpf: '11111111111',
      email: 'celso.shigaki@gmail.com',
    };

    render(<StudentCard student={student} />);

    expect(screen.getByTestId('student-portrait').getAttribute('src')).toBe(
      '/fallback.png'
    );
  });
});
