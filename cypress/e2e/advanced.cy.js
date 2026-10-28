it('keeps the form locked until the 600 ms authentication finishes', () => {
  cy.clock()

  fillLogin('student@gmu.edu', 'cypress123')
  cy.get(SUBMIT).click()

  cy.get(LOADING).should('be.visible')
  cy.get(SUBMIT).should('be.disabled')

  cy.tick(599)
  cy.get(SUCCESS).should('not.exist')

  cy.tick(1)
  cy.get(SUCCESS)
    .should('contain.text', 'Welcome back, Student!')

  cy.get(SUBMIT).should('be.enabled')
})
