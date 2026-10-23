// A test that fails on purpose -- for the "what does a failure look like?"
// part of the presentation.
//
// It is skipped by default so that `npm test` stays green for classmates.
// To demonstrate a failure, change `describe.skip` to `describe` and run:
//
//     npm run cy:open        (watch it fail in the browser, step by step)
//     npm test               (see the failure in the terminal)
//
// To put everything back exactly as it was:
//
//     git restore .
//
// Two different kinds of failure are shown here, and telling them apart is
// the point: one is a wrong expectation, the other is a broken selector.

describe.skip('Failures on purpose', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('fails because the expected text is wrong', () => {
    cy.login('student@gmu.edu', 'cypress123')

    // The page actually says "Welcome back, Student!".
    // Cypress prints expected vs. actual, which is how you spot this.
    cy.get('[data-cy="success-message"]').should('contain.text', 'Goodbye')
  })

  it('errors because the element does not exist', () => {
    // Nothing on the page has this attribute, so the command times out
    // after 4 seconds. This is a broken TEST, not a broken APP --
    // a distinction worth calling out during the demo.
    cy.get('[data-cy="this-element-does-not-exist"]').should('be.visible')
  })
})
