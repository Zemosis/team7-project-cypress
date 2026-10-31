// Person 3: Jusleen Khural
// Basic testing

// Suite: groups related tests
describe('Login page', () => {

  // Runs before every test, so each starts on a fresh page
  beforeEach(() => {
    cy.visit('/')
  })

  // Test: one behavior
  it('logs in with a valid demo account', () => {
    // Commands: the steps
    cy.get('[data-cy="email-input"]').type('student@gmu.edu')
    cy.get('[data-cy="password-input"]').type('cypress123')
    cy.get('[data-cy="login-button"]').click()

    // Assertions: what we expect to be true
    cy.get('[data-cy="loading-message"]').should('be.visible')
    cy.get('[data-cy="success-message"]')
      .should('be.visible')
      .and('contain.text', 'Welcome back')
    cy.get('[data-cy="error-message"]').should('not.exist')
  })

  it('shows the right error for several bad logins', () => {
    const badLogins = [
      { email: 'student@gmu.edu', password: 'wrongpass',  error: 'Invalid email or password.' },
      { email: 'notanemail',      password: 'cypress123', error: 'Please enter a valid email address.' },
      { email: 'team7@gmu.edu',   password: 'cypress123', error: 'Invalid email or password.' },
    ]

    badLogins.forEach(({ email, password, error }) => {
      cy.visit('/') // fresh page for each scenario
      cy.get('[data-cy="email-input"]').clear().type(email)
      cy.get('[data-cy="password-input"]').clear().type(password)
      cy.get('[data-cy="login-button"]').click()
      cy.get('[data-cy="error-message"]').should('be.visible').and('have.text', error)
    })
  })
})
