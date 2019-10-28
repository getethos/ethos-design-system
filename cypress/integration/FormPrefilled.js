describe('FormPrefilled', () => {
  beforeEach(() => {
    cy.visit('/#/Components/FormPrefilled')
  })

  it('fully prefilled form should result in submit button enabled', () => {
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
