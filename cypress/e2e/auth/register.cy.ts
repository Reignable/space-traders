describe('Register', () => {
  it('can register', () => {
    cy.visit('/auth/register');
    cy.findByLabelText(/callsign/i).should('be.visible');
    cy.findByRole('button', { name: /register/i }).should('be.visible');
    cy.findByLabelText(/callsign/i).type('test-callsign');
    cy.findByRole('button', { name: /register/i }).click();
    cy.url().should('include', '/home');
    cy.findByRole('heading', { name: /home/i }).should('be.visible');
    cy.findByRole('button', { name: /logout/i }).should('be.visible');
  });
});
