describe('Viewing contracts', () => {
  beforeEach(() => {
    cy.visit('/contracts');
  });

  it('displays a list of available contracts', () => {
    cy.findByRole('heading', { name: /available contracts/i }).should('exist');
    cy.findByRole('list').should('exist');
  });

  // it('displays the details of a selected mission contract', () => {
  //   cy.findByRole('list').first().click();

  //   cy.get('[data-testid="mission-contract-details"]').should('exist');
  // });

  // it('allows the user to accept a mission contract', () => {
  //   cy.get('[data-testid="mission-contracts-list"]').first().click();

  //   cy.get('[data-testid="accept-mission-button"]').click();

  //   cy.get('[data-testid="mission-accepted-message"]').should('exist');
  // });
});
