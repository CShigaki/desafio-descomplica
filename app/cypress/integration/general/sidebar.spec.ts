describe('Sidebar', () => {
  it('doesnt show the hide/show indicator on big resolutions', () => {
    cy.visit('/');

    cy.get('.toggle-sidebar').should('not.be.visible');
  });

  it('shows sidebar hide/show indicator', () => {
    // 375x667
    cy.viewport('iphone-6');

    cy.visit('/');

    cy.get('.toggle-sidebar').should('be.visible');
  });

  it('toggles sidebar when clicking indicator', () => {
    // 375x667
    cy.viewport('iphone-6');

    cy.visit('/');

    cy.get('.toggle-sidebar').click();
    cy.findAllByTestId('sidebar').should('not.be.visible');

    cy.get('.toggle-sidebar').click();
    cy.findAllByTestId('sidebar').should('be.visible');
  });
});