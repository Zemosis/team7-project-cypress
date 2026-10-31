
it('keeps the form locked until the 600 ms authentication finishes', () => {

  // Take control of the browser's clock to simulate time passing.
  cy.clock()

  // Enter a valid email address and password into the login form.
  fillLogin('student@gmu.edu', 'cypress123')

  // Click the login button to begin authentication.
  cy.get(SUBMIT).click()

  // Verify that the loading message appears during authentication.
  cy.get(LOADING).should('be.visible')

  // Verify that the login button is disabled while authentication is running.
  // This prevents the user from submitting the form multiple times.
  cy.get(SUBMIT).should('be.disabled')

  // Advance the simulated clock by 599 milliseconds.
  // Authentication should not be complete because the delay is 600 ms.
  cy.tick(599)

  // Verify that the success message has not appeared yet.
  cy.get(SUCCESS).should('not.exist')

  // Advance the clock by 1 more millisecond.
  // Total simulated time = 600 ms, completing authentication.
  cy.tick(1)

  // Verify that authentication succeeded.
  // The application should display "Welcome back, Student!".
  cy.get(SUCCESS)
    .should('contain.text', 'Welcome back, Student!')

  // Verify that the login button is enabled again after authentication.
  cy.get(SUBMIT).should('be.enabled')

})
