// Person 3 (Jusleen) -- basic Cypress tests.
//
// The first test is written as a worked example of the Arrange-Act-Assert
// pattern. The tests below it have no body yet, so Cypress reports them as
// PENDING -- they show up in the runner as a checklist of what to write.
//
// Selectors available on the page (see src/LoginPage.jsx):
//   [data-cy="login-form"]       the form itself
//   [data-cy="login-heading"]    the "Sign in" heading
//   [data-cy="email-input"]      email field
//   [data-cy="password-input"]   password field
//   [data-cy="toggle-password"]  Show / Hide button
//   [data-cy="login-button"]     submit button
//   [data-cy="loading-message"]  appears while the login call is in flight
//   [data-cy="error-message"]    validation and failure messages
//   [data-cy="success-message"]  successful login message
//
// Demo credentials: student@gmu.edu / cypress123

describe('Login page', () => {
  beforeEach(() => {
    // Arrange: every test starts on a freshly loaded login page.
    cy.visit('/')
  })

  it('loads the login page with an empty form', () => {
    // Assert: the form is visible and both fields start empty.
    cy.get('[data-cy="login-form"]').should('be.visible')
    cy.get('[data-cy="email-input"]').should('have.value', '')
    cy.get('[data-cy="password-input"]').should('have.value', '')
  })

  it('logs in successfully with valid credentials', () => {
    // Arrange
    cy.get('[data-cy="email-input"]').type('student@gmu.edu')
    cy.get('[data-cy="password-input"]').type('cypress123')

    // Act
    cy.get('[data-cy="login-button"]').click()

    // Assert -- Cypress waits for the message to appear on its own,
    // no cy.wait() or sleep() needed.
    cy.get('[data-cy="success-message"]').should('contain.text', 'Welcome back')
  })

  // TODO (Person 3): fill in the tests below.
  it('shows an error when both fields are empty')

  it('shows an error for an incorrect password')

  it('shows an error for an unknown email address')

  it('toggles the password between hidden and visible')
})
