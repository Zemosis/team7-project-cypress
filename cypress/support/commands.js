// Custom Cypress commands.
//
// A custom command bundles a repeated sequence into one reusable step.
// Person 4 can demonstrate this during the "reusable commands" section.

Cypress.Commands.add('login', (email, password) => {
  cy.get('[data-cy="email-input"]').clear().type(email)
  cy.get('[data-cy="password-input"]').clear().type(password)
  cy.get('[data-cy="login-button"]').click()
})
