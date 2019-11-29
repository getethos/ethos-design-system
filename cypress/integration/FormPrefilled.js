describe('FormPrefilled', () => {
  beforeEach(() => {
    cy.visit('/#/Core/FormPrefilled')
  })

  it('fully prefilled form should result in submit button enabled', () => {
    // This is actually needed—when we load the prefilled form demo, the button
    // will start as disabled; so we have to wait for the call to getFormIsValid()
    // to get called, and the disabled attribute to actually get removed
    cy.wait(200)
    cy.getByTid('button-prefilled-submit').should('not.be.disabled')
  })

  it('any invalid field should result in submit button disabled', () => {
    const invalid = 'too long a string'
    cy.getByTid('even-num-text')
      .type(invalid)
      .trigger('blur')
    cy.getByTid('button-prefilled-submit').should('be.disabled')
  })
})
