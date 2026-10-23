// Person 2 (Trang) -- setup verification.
//
// A smoke test: it proves the project, the dev server and Cypress are all
// wired together correctly. It does NOT prove the login page works; that is
// what the specs in person3-basic-login.cy.js are for.

describe('Cypress setup', () => {
  it('opens the homepage', () => {
    cy.visit('/')
    cy.get('body').should('be.visible')
  })

  it('renders the login form', () => {
    cy.visit('/')
    cy.get('[data-cy="login-form"]').should('be.visible')
    cy.get('[data-cy="login-heading"]').should('contain.text', 'Sign in')
  })
})
