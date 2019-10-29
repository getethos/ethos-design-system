describe('CheckboxInput', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9008/#/Components/CheckboxInput')
  })

  //TODO -- I'd think following would work, but cypress didn't cooperate :(
  // .trigger('keyCode', { key: 'Space', keyCode: 32, force: true}) 
  it('toggles checked', () => {
    cy.get('[data-tid="le-tid-unchecked"]')
      .check({force: true})
      .should('be.checked')
  })

  it('toggles unchecked', () => {
    cy.get('[data-tid="le-tid-checked"]')
      .uncheck({force: true})
      .should('not.be.checked')
  })
})
