// Person 4 (Syed) -- advanced testing, debugging and practical usage.
//
// Tools already set up for this section:
//   cy.login(email, password)          custom command, cypress/support/commands.js
//   cy.fixture('users')                test data, cypress/fixtures/users.json
//   src/auth.js                        the pure validateCredentials() function
//                                      -- a good place to inject a bug on purpose
//   [data-cy="loading-message"]        proves Cypress waits for async behavior
//
// The login call is delayed by LOGIN_DELAY_MS (600ms) in src/auth.js, so the
// page is genuinely asynchronous and auto-waiting is worth demonstrating.

describe('Advanced login behavior', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('waits for the asynchronous login call without an explicit wait', () => {
    // Worked example of auto-waiting and the custom command.
    cy.login('student@gmu.edu', 'cypress123')
    cy.get('[data-cy="loading-message"]').should('be.visible')
    cy.get('[data-cy="success-message"]').should('be.visible')
  })

  it('reads credentials from a fixture file', () => {
    // Worked example of a fixture.
    cy.fixture('users').then((users) => {
      cy.login(users.wrongPassword.email, users.wrongPassword.password)
      cy.get('[data-cy="error-message"]').should('contain.text', 'Invalid email or password')
    })
  })

  // TODO (Person 4): fill in the tests below.
  it('rejects a password made only of whitespace')

  it('rejects an email with no @ sign')

  it('trims surrounding whitespace from the email before checking it')

  it('keeps the submit button disabled while the login call is running')
})
