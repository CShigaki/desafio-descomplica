interface Student {
  id: string;
  name: string;
  email: string;
  cpf: string;
  gravatar?: string;
}

describe('Students', () => {
  beforeEach(() => {
    cy.clearTable('student');
  });

  it('shows students added in the database', () => {
    cy.seedTable<Student>({
      tableName: 'student',
      data: [
        {
          id: '1',
          name: 'Celso',
          cpf: '111111111111',
          email: 'celso.shigaki@gmail.com',
        },
      ]
    });

    cy.visit('/students');

    cy.findAllByTestId('student-card').should('have.length', 1);
  });
});