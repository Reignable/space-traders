describe('Login', () => {
  it('Shows the login page by default', () => {
    cy.visit('/');
    cy.findAllByLabelText(/token/i).should('exist');
    cy.findByRole('button', { name: /login/i }).should('exist');
    cy.findByRole('link', { name: /register/i }).should('exist');
  });

  it('Shows the register page when clicking on the register link', () => {
    cy.visit('/auth/login');
    cy.findByRole('link', { name: /register/i }).click();
    cy.findByLabelText(/callsign/i).should('exist');
    cy.findByRole('button', { name: /register/i }).should('exist');
  });

  it('Logs in when clicking on the login button', () => {
    cy.visit('/auth/login');
    cy.findByLabelText(/token/i).type('123');
    cy.findByRole('button', { name: /login/i }).click();
    cy.findByRole('heading', { name: /home/i }).should('exist');
    cy.findByRole('button', { name: /logout/i }).should('exist');
    cy.findByRole('heading', { name: /callsign/i }).should('exist');
    cy.findByText('123').should('exist');
  });
});
