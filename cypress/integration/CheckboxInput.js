describe('CheckboxInput', () => {
  beforeEach(() => {
    cy.visit('/#/Core/CheckboxInput')
  })

  //TODO -- I'd think following would work, but cypress didn't cooperate :(
  // .trigger('keyCode', { key: 'Space', keyCode: 32, force: true})
  it('toggles checked', () => {
    cy.getByTid('le-tid-unchecked')
      .check({ force: true })
      .should('be.checked')
  })

  it('toggles unchecked', () => {
    cy.getByTid('le-tid-checked')
      .uncheck({ force: true })
      .should('not.be.checked')
  })
})
