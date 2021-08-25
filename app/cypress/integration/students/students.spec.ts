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

  it('shows students added in the database', async () => {
    const fixture = await cy.fixture('student/testRendering.json');

    cy.seedTable<Student>({
      tableName: 'student',
      data: [fixture]
    });

    cy.visit('/students');

    cy.findAllByTestId('student-card').should('have.length', 1);
    cy.findAllByTestId('student-card').within(() => {
      cy.contains('Celso').should('be.visible');
      cy.contains('111111111111').should('be.visible');
      cy.contains('celso.shigaki@gmail.com').should('be.visible');
    });
  });

  it('shows empty state when there are no students added', () => {
    cy.visit('/students');
    cy.findAllByTestId('student-card').should('have.length', 0);

    cy.contains('No results found').should('be.visible');
  });

  it('filters by name, cpf or email', async () => {
    const fixture = await cy.fixture('student/testFiltering.json');

    cy.seedTable<Student>({
      tableName: 'student',
      data: fixture,
    });

    cy.visit('/students');

    cy.findAllByTestId('student-card').should('have.length', 3);

    // Filter by name
    cy.findAllByTestId('search-field').type('Celso');
    cy.findAllByTestId('student-card').should('have.length', 1);
    cy.contains('Celso').should('be.visible');
    cy.findAllByTestId('search-field').clear();

    // Filter by CPF
    cy.findAllByTestId('search-field').type('222222222222');
    cy.findAllByTestId('student-card').should('have.length', 1);
    cy.contains('Genji').should('be.visible');
    cy.findAllByTestId('search-field').clear();

    // Filter by email
    cy.findAllByTestId('search-field').type('ana@gmail.com');
    cy.findAllByTestId('student-card').should('have.length', 1);
    cy.contains('Ana').should('be.visible');
  });

  it('paginates results', async () => {
    const fixture = await cy.fixture('student/testPagination.json');

    cy.seedTable<Student>({
      tableName: 'student',
      data: fixture,
    });

    cy.visit('/students');

    // Tests next page
    cy.findAllByTestId('student-card').should('have.length', 10);
    cy.contains('1-10 of 12').should('be.visible');

    cy.findAllByTestId('pagination-next-page').click();

    cy.findAllByTestId('student-card').should('have.length', 2);
    cy.contains('11-12 of 12').should('be.visible');

    // Tests rows per page
    cy.findByText('10').click();
    cy.findByText('25').click();

    cy.findAllByTestId('student-card').should('have.length', 12);
    cy.contains('1-12 of 12').should('be.visible');
  })
});