describe('FormPrefilled', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9008/#/Components/FormPrefilled')
  })

  it('fully prefilled form should result in submit button enabled', () => {
    cy.get('[data-tid="button-prefilled-submit"]').should('not.be.disabled')
  })

  it('any invalid field should result in submit button disabled', () => {
    const invalid = 'too long a string'
    cy.get('[data-tid="even-num-text"]')
      .type(invalid)
      .trigger('blur')
    cy.get('[data-tid="button-prefilled-submit"]').should('be.disabled')
  })
})
